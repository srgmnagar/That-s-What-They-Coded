import os
import pytesseract
import re
import pdf2image
from PIL import Image

def extract_text_from_image(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
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

def extract_skills(text, skills_list):
    found_skills = [skill for skill in skills_list if skill.lower() in text.lower()]
    match_percentage = (len(found_skills) / len(skills_list)) * 100 if skills_list else 0
    return found_skills, round(match_percentage, 2)

def scan_resume(resume_file, skills_list):
    file_extension = os.path.splitext(resume_file.name)[1].lower()
    file_path = f"temp{file_extension}"

    with open(file_path, "wb+") as temp_file:
        for chunk in resume_file.chunks():
            temp_file.write(chunk)

    if file_extension in ['.jpg', '.jpeg', '.png']:
        text = extract_text_from_image(file_path)
    elif file_extension == '.pdf':
        text = extract_text_from_pdf(file_path)
    else:
        os.remove(file_path)
        return {"error": "Unsupported file format"}

    os.remove(file_path)

    found_skills, match_percentage = extract_skills(text, skills_list)

    return {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": found_skills,
        "skills_match_percentage": match_percentage
    }
