# Maternal Care Patient Assessment

A web application for registering patients, recording visits, collecting assessments, and classifying maternal health risk with a trained machine learning model.

## Technology

- **Frontend:** React, TypeScript, and Vite
- **Backend:** Python and FastAPI
- **Database:** PostgreSQL
- **Machine learning:** scikit-learn K-nearest neighbors (KNN)
- **Training data:** UCI Maternal Health Risk dataset

## API approach

I implemented a custom REST API with FastAPI and PostgreSQL instead of consuming the demo APIs from the Postman collection.

The API handles patient registration, visit vitals, assessment forms, patient reports, and maternal health risk predictions.

## Patient workflow

1. Register each patient once.
2. Select a patient from the list to start a visit.
3. Record the visit date, height, and weight. The API calculates BMI.
4. The BMI determines which assessment form is shown:
   - BMI less than or equal to 25: General Assessment
   - BMI greater than 25: Overweight Assessment
5. After the assessment is saved, return to the patient list.

Patients can have multiple visits on different dates. The list shows each patient once with their latest visit’s BMI status. Use the visit-date filter to view a patient’s record for a specific visit date.

## BMI status

The patient report classifies BMI as:

- **Underweight:** less than 18.5
- **Normal:** 18.5 to less than 25
- **Overweight:** 25 or greater

## Maternal health risk classification

The model is trained by `services/api/app/ml/train_model.py` using the UCI Maternal Health Risk dataset. It uses a scikit-learn pipeline with feature scaling and a KNN classifier.

The prediction endpoint is:

```http
POST /risk/predict
