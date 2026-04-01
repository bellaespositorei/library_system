import { AuthorModel } from "../models/AuthorModel.js";

class AuthorController {
  static async listAllAuthors(req, res) {
    try {
      const listAll = await AuthorModel.find({});
      res.status(200).json(listAll);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async listAuthorById(req, res) {
    try {
      const id = req.params.id;
      const foundAuthor = await AuthorModel.findById(id);
      res.status(200).json(foundAuthor);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição do autor` });
    }
  }

  static async addAuthor(req, res) {
    try {
      const newAuthor = await AuthorModel.create(req.body);
      res
        .status(201)
        .json({ message: "adicionado com sucesso", autor: newAuthor });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar o autor` });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const id = req.params.id;
      await AuthorModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na atualização do autor` });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id;
      await AuthorModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor deletado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na deleção do autor` });
    }
  }
}

export default AuthorController;
