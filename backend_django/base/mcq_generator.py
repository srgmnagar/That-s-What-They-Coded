import wikipediaapi
import nltk
import spacy
from transformers import pipeline
from nltk.corpus import wordnet
from sentence_transformers import SentenceTransformer, util

# Load NLP Models
nlp = spacy.load("en_core_web_sm")
qg_pipeline = pipeline("text2text-generation", model="t5-base")  # Switched to 't5-base'
bert_model = SentenceTransformer('all-MiniLM-L6-v2')

# Download NLTK resources
nltk.download('wordnet')
nltk.download('omw-1.4')


def get_wikipedia_content(topic):
    """Fetches summary from Wikipedia with more content"""
    user_agent = "MCQGenerator/1.0 (contact: your_email@example.com)"
    wiki_wiki = wikipediaapi.Wikipedia(language='en', user_agent=user_agent)
    
    page = wiki_wiki.page(topic)
    if not page.exists():
        print(f"❌ Topic '{topic}' not found on Wikipedia!")
        return None
    
    return page.text[:2500]  # Extract more content


def generate_questions(text, num_questions=5):
    """Generate better questions using T5"""
    doc = nlp(text)
    sentences = [sent.text for sent in doc.sents if len(sent.text) > 30]

    questions = []
    for sentence in sentences[:num_questions]:
        input_text = f"generate question: {sentence}"
        try:
            generated = qg_pipeline(input_text, max_length=60, truncation=True)
            question = generated[0]['generated_text']
            if len(question.split()) > 5:  # Ensure valid question
                questions.append((question, sentence))
        except Exception as e:
            print(f"⚠️ Error generating question: {e}")
    
    return questions


def get_distractors_bert(correct_answer, num_distractors=3):
    """Generate better distractors using BERT & WordNet"""
    synonyms = set()

    for syn in wordnet.synsets(correct_answer):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name().replace("_", " "))

    if len(synonyms) < num_distractors:
        return ["Option A", "Option B", "Option C"]  # Fallback

    word_embedding = bert_model.encode(correct_answer, convert_to_tensor=True)
    synonym_embeddings = bert_model.encode(list(synonyms), convert_to_tensor=True)

    similarities = util.pytorch_cos_sim(word_embedding, synonym_embeddings)[0]
    top_indices = similarities.argsort(descending=True)[:num_distractors]
    
    return [list(synonyms)[i] for i in top_indices]


def extract_keywords(sentence):
    """Extracts better keywords for answer selection"""
    doc = nlp(sentence)
    keywords = [token.text for token in doc if token.pos_ in ["NOUN", "PROPN", "ADJ"] and len(token.text) > 3]
    
    return keywords if keywords else ["Artificial Intelligence"]  # Default fallback


def generate_mcqs(topic):
    """Full MCQ generation pipeline"""
    text = get_wikipedia_content(topic)
    if not text:
        return None

    questions = generate_questions(text, num_questions=5)
    mcqs = []

import random

def generate_mcq(topic, num_questions=5, difficulty="medium"):
    """Generates MCQs from a predefined database with difficulty levels."""
    
    sample_questions = {
        "Physics": {
            "easy": [
                ("What is the SI unit of force?", ["Newton", "Joule", "Watt", "Pascal"], "Newton"),
                ("What is the speed of light?", ["3x10^8 m/s", "3x10^6 m/s", "3x10^10 m/s", "3x10^4 m/s"], "3x10^8 m/s")
            ],
            "medium": [
                ("Which law states that for every action, there is an equal and opposite reaction?", ["Newton’s First Law", "Newton’s Second Law", "Newton’s Third Law", "Law of Conservation"], "Newton’s Third Law"),
                ("Which fundamental force is responsible for keeping planets in orbit?", ["Gravitational", "Electromagnetic", "Nuclear", "Frictional"], "Gravitational")
            ],
            "hard": [
                ("What is the escape velocity of Earth?", ["11.2 km/s", "9.8 m/s²", "3x10^8 m/s", "299,792,458 m/s"], "11.2 km/s"),
                ("What is the unit of electrical resistance?", ["Ohm", "Volt", "Ampere", "Farad"], "Ohm")
            ]
        },
        "Biology": {
            "easy": [
                ("What is the powerhouse of the cell?", ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"], "Mitochondria"),
                ("What is the basic unit of life?", ["Cell", "Tissue", "Organ", "Organ System"], "Cell")
            ],
            "medium": [
                ("Which part of the brain controls balance?", ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"], "Cerebellum"),
                ("What is the function of hemoglobin?", ["Transport oxygen", "Fight infection", "Digest food", "Break down fats"], "Transport oxygen")
            ],
            "hard": [
                ("What is the term for programmed cell death?", ["Necrosis", "Apoptosis", "Mitosis", "Endocytosis"], "Apoptosis"),
                ("Which enzyme unzips the DNA strands during replication?", ["Helicase", "Ligase", "Polymerase", "Primase"], "Helicase")
            ]
        }
    }

    # Validate topic and difficulty
    if topic not in sample_questions:
        return {"error": "Topic not available. Try another topic."}
    
    if difficulty not in sample_questions[topic]:
        return {"error": "Invalid difficulty level. Choose easy, medium, or hard."}

    # Get questions based on difficulty
    available_questions = sample_questions[topic][difficulty]
    selected_questions = random.sample(available_questions, min(num_questions, len(available_questions)))

    # Prepare final MCQ list
    mcq_list = []
    for question, options, answer in selected_questions:
        random.shuffle(options)  # Shuffle answer options
        mcq_list.append({
            "question": question,
            "options": options,
            "answer": answer
        })

    return {"topic": topic, "difficulty": difficulty, "mcqs": mcq_list}
