"""
VOLKSWAGEN PRODUCT INTELLIGENCE - INTERACTIVE FRONTEND
VERSION: 1.0.0
DESCRIPTION: Streamlit UI that calls the Volkswagen RAG backend over HTTP.
"""

import logging

import requests
import streamlit as st

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

RETRIEVE_URL = "http://localhost:8000/retrieve"

st.set_page_config(
    page_title="VW Product Intelligence",
    page_icon="🚗",
    layout="wide",
)

st.markdown(
    """
    <style>
    .main {
        background-color: #f5f5f5;
    }
    .stButton>button {
        background-color: #001e50;
        color: white;
        border-radius: 5px;
    }
    .stTextInput>div>div>input {
        border: 2px solid #001e50;
    }
    h1 {
        color: #001e50;
        font-family: 'Arial', sans-serif;
    }
    </style>
    """,
    unsafe_allow_html=True,
)


def ask_backend(question: str) -> str:
    response = requests.post(
        RETRIEVE_URL,
        json={"question": question},
        headers={"Content-Type": "application/json"},
        timeout=120,
    )
    response.raise_for_status()
    data = response.json()
    if "answer" not in data:
        raise ValueError(f"Unexpected API response: {data}")
    return data["answer"]


with st.sidebar:
    st.image("https://www.volkswagen-newsroom.com/en/images/volkswagen-logo-1.jpg", width=100)
    st.title("System Specs")
    st.info(
        """
    **LLM:** Llama-3.3-70B (Groq) — *backend*
    **Database:** Qdrant Cloud — *backend*
    **Embeddings:** Nomic-Embed-Text — *backend*
    """
    )
    st.caption(f"API: `{RETRIEVE_URL}`")
    if st.button("Clear Chat History"):
        st.session_state.messages = []

st.title("🚗 Volkswagen Product Intelligence AI")
st.subheader("Official Newsroom Knowledge Base (Taigun GT & Beyond)")

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Ask about technical specs, engine details, or safety features..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Calling RAG backend..."):
            try:
                answer = ask_backend(prompt)
                st.markdown(answer)
                st.session_state.messages.append({"role": "assistant", "content": answer})
            except requests.exceptions.RequestException as e:
                st.error(f"Backend request failed ({RETRIEVE_URL}): {e}")
            except (ValueError, KeyError) as e:
                st.error(f"Inference Error: {e}")

st.divider()
st.caption("Developed for Volkswagen Technical Portfolio | Frontend → Backend API")
