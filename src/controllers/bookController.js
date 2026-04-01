import { AuthorModel } from "../models/AuthorModel.js";
import BookModel from "../models/BookModel.js";

class BookController {
  static async listAllBooks(req, res) {
    try {
      const listAll = await BookModel.find({});
      res.status(200).json(listAll);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async listBookById(req, res) {
    try {
      const id = req.params.id;
      const foundBook = await BookModel.findById(id);
      res.status(200).json(foundBook);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição do livro` });
    }
  }

  static async addBook(req, res) {
    const newBook = req.body;
    try {
      const foundAuthor = await AuthorModel.findById(newBook.author);
      const completedBook = { ...newBook, author: { ...foundAuthor._doc } };
      const createdBook = await BookModel.create(completedBook);
      res
        .status(201)
        .json({ message: "adicionado com sucesso", book: createdBook });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar livro` });
    }
  }

  static async updateBook(req, res) {
    try {
      const id = req.params.id;
      let updateData = req.body;

      if (req.body.author) {
        const foundAuthor = await AuthorModel.findById(req.body.author);

        if (!foundAuthor) {
          return res.status(404).json({ message: "Autor não encontrado" });
        }
        updateData = { ...req.body, author: { ...foundAuthor._doc } };
      }
      await BookModel.findByIdAndUpdate(id, updateData);
      res.status(200).json({ message: "Livro atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na atualização do livro` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const id = req.params.id;
      await BookModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro deletado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na deleção do livro` });
    }
  }

  static async listBooksByTitle(req, res) {
    const bookName = req.query.title;
    try {
      const bookByTitle = await BookModel.find({
        title: { $regex: bookName, $options: "i" },
      });
      res.status(200).json(bookByTitle);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` });
    }
  }
}

export default BookController;
