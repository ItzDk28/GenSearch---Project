from openai import OpenAI

client = OpenAI(
    base_url="https://api.sree.shop/v1",
    api_key="ddc-AfMK9EepV8G04GG6yuaao2ix3LMQuRr7u99MctlcTzfEBtKhrv"  # Replace with your API key
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)