import requests

def get_book_data(title):
    url = f"https://www.googleapis.com/books/v1/volumes?q={title}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

# Fetch and display book information
book_data = get_book_data("Pride and Prejudice")
if book_data:
    print(book_data)
