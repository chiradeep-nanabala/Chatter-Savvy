# api/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
import requests  # Make sure to install requests using: pip install requests
from bardapi import Bard
import os

@method_decorator(csrf_exempt, name='dispatch')
class ChatGPTApi(View):
    def post(self, request, *args, **kwargs):
        def generate_prompt(api_url, token, payload=None):
            try:
                headers = {
                    'Authorization': f'Bearer {token}',
                    'Content-Type': 'application/json'
                }
                response = requests.post(api_url, headers=headers, json=payload)
                if response.status_code == 200:
                    return response.json()
                else:
                    print(f"API call failed with status code: {response.status_code}")
                    print(response.text)
                    return None
            except requests.exceptions.RequestException as e:
                print("An error occurred while making the API call:", e)
                return None
        
        data = json.loads(request.body)
        input_text = data.get('input_text', '')
        # Place your token
        bearer_token = ''
        api_url = 'https://api.openai.com/v1/chat/completions'

        payload = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": input_text
                }
            ]
        }
        response_data = generate_prompt(api_url, bearer_token, payload)
        return JsonResponse({"response": "ChatGPT API call successful", "response": response_data['choices'][0]['message']['content']})

@method_decorator(csrf_exempt, name='dispatch')
class BardApi(View):
    def post(self, request, *args, **kwargs):
        # Place your token
        os.environ['_BARD_API_KEY'] = ''
        data = json.loads(request.body)
        input_text = data.get('input_text', '')
        response_data = Bard().get_answer(input_text)['content']
        return JsonResponse({"response": "Gemini API call successful", "response": response_data})
