document.addEventListener('DOMContentLoaded', () => {
    const addBookBtn = document.getElementById('addBookBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const saveBookBtn = document.getElementById('saveBookBtn');
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const bookList = document.getElementById('bookList');

    const loadBooks = () => {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        books.forEach(book => {
            addBookToList(book.title, book.author, book.isRead);
        });
    };

    const saveBooks = (books) => {
        localStorage.setItem('books', JSON.stringify(books));
    };

    const addBookToList = (title, author, isRead = false) => {
        const li = document.createElement('li');
        li.classList.add(isRead ? 'read' : 'unread');

        const span = document.createElement('span');
        span.className = 'book-title';
        span.textContent = `${title} by ${author}`;
        li.appendChild(span);

        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.className = 'toggle-read-btn';
        toggleReadBtn.textContent = isRead ? 'Non lu' : 'Lu';
        toggleReadBtn.addEventListener('click', () => {
            li.classList.toggle('read');
            li.classList.toggle('unread');
            toggleReadBtn.textContent = li.classList.contains('read') ? 'Non lu' : 'Lu';
            updateBookStatus(title, author, li.classList.contains('read'));
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            removeBookFromStorage(title, author);
        });

        actionButtons.appendChild(toggleReadBtn);
        actionButtons.appendChild(deleteBtn);
        li.appendChild(actionButtons);

        bookList.appendChild(li);
    };

    const updateBookStatus = (title, author, isRead) => {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.map(book => {
            if (book.title === title && book.author === author) {
                book.isRead = isRead;
            }
            return book;
        });
        saveBooks(updatedBooks);
    };

    const removeBookFromStorage = (title, author) => {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const updatedBooks = books.filter(book => !(book.title === title && book.author === author));
        saveBooks(updatedBooks);
    };

    addBookBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    saveBookBtn.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();

        if (title && author) {
            addBookToList(title, author);
            
            const books = JSON.parse(localStorage.getItem('books')) || [];
            books.push({ title, author, isRead: false });
            saveBooks(books);
            
            titleInput.value = '';
            authorInput.value = '';
            modal.style.display = 'none';
        } else {
            alert('Veuillez remplir les deux champs.');
        }
    });

    loadBooks();
});
