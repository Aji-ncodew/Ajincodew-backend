// books.js
const { db } = require("./admin.js");

exports.getAllBooks = async (req, res) => {
    const booksRef = db.collection('Books');
    try {
        const snapshot = await booksRef.get();
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong, please try again" });
    }
};

exports.getBookById = async (req, res) => {
    const { bookId } = req.params;
    const bookRef = db.collection('Books').doc(bookId);

    try {
        const doc = await bookRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Book not found" });
        }

        const bookData = doc.data();
        console.log(bookData);
        return res.status(200).json(bookData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong, please try again" });
    }
};

exports.createBook = async (req, res) => {
    const newBook = req.body;

    try {
        const docRef = await db.collection('Books').add(newBook);
        const bookData = await docRef.get();
        console.log(bookData.data());
        return res.status(201).json({ message: "Book created successfully", bookId: docRef.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong, please try again" });
    }
};

exports.updateBook = async (req, res) => {
    const { bookId } = req.params;
    const updatedBook = req.body;

    try {
        const bookRef = db.collection('Books').doc(bookId);
        const doc = await bookRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Book not found" });
        }

        await bookRef.update(updatedBook);
        const updatedData = await bookRef.get();
        console.log(updatedData.data());
        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong, please try again" });
    }
};

exports.deleteBook = async (req, res) => {
    const { bookId } = req.params;
    const bookRef = db.collection('Books').doc(bookId);

    try {
        const doc = await bookRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: "Book not found" });
        }

        await bookRef.delete();
        console.log("Book deleted successfully");
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong, please try again" });
    }
};
