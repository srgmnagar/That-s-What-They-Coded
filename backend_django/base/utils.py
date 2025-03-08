import pytesseract
import re
import os
import pdf2image
from PIL import Image

from sklearn.feature_extraction.text import TfidfVectorizer
import spacy

# Load SpaCy's small English model
nlp = spacy.load("en_core_web_sm")

def extract_skills_with_ner(text):
    doc = nlp(text)
    extracted_skills = set()

    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "WORK_OF_ART"]:  # Skills often fall under these categories
            extracted_skills.add(ent.text)

    return list(extracted_skills)


def extract_top_keywords(text, top_n=10):
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform([text])
    
    feature_array = vectorizer.get_feature_names_out()
    tfidf_scores = tfidf_matrix.toarray()[0]

    # Get top N keywords
    top_indices = tfidf_scores.argsort()[-top_n:][::-1]
    top_keywords = [feature_array[i] for i in top_indices]

    return top_keywords

from fuzzywuzzy import process

# Load an external skills dataset (replace with your own)
skills_database = ["Python", "TensorFlow", "Machine Learning", "SQL", "Leadership", "Kubernetes"]

def extract_skills_fuzzy(text):
    words = text.split()
    found_skills = set()
    
    for word in words:
        match, score = process.extractOne(word, skills_database)
        if score > 80:  # Adjust threshold as needed
            found_skills.add(match)

    return list(found_skills)


def extract_text_from_image(image_path):
    image = Image.open(image_path)
    # custom_config = r'--oem 3 --psm 6'  # Use LSTM OCR engine & assume semi-structured text
    text = pytesseract.image_to_string(image)  #, config=custom_config)
    return text

def extract_text_from_pdf(pdf_path):
    images = pdf2image.convert_from_path(pdf_path)
    text = ""
    for image in images:
        text += pytesseract.image_to_string(image) + "\n"
    return text

def extract_email(text):
    email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}'
    matches = re.findall(email_pattern, text)
    return matches[0] if matches else None


def extract_phone(text):
    phone_pattern = r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    match = re.search(phone_pattern, text)
    return match.group(0) if match else None


def extract_skills(text):
    skills = set()
    skills.update(extract_skills_with_ner(text))
    skills.update(extract_top_keywords(text, top_n=15))
    skills.update(extract_skills_fuzzy(text))
    return skills
    # return list(skills)

def scan_resume(uploaded_file):
    file_extension = os.path.splitext(uploaded_file.name)[1].lower()
    
    if file_extension in ['.jpg', '.jpeg', '.png']:
        # Open the image directly from InMemoryUploadedFile
        image = Image.open(uploaded_file)
        text = pytesseract.image_to_string(image)

    elif file_extension == '.pdf':
        # Convert PDF to images directly from InMemoryUploadedFile
        pdf_bytes = uploaded_file.read()  # Read the file as bytes
        pdf_images = pdf2image.convert_from_bytes(pdf_bytes)  # Convert PDF to image(s)
        text = "\n".join([pytesseract.image_to_string(img) for img in pdf_images])

    else:
        raise ValueError("Unsupported file format")
    
    extracted_data = {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text)
    }
    
    print(extract_email(text))
    print(extract_phone(text))
    print(extract_skills(text))
    
    return extracted_data