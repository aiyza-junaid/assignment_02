const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content, userId: req.user.id });
  await note.save();
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findOneAndUpdate({ _id: id, userId: req.user.id }, { title, content }, { new: true });
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  await Note.findOneAndDelete({ _id: id, userId: req.user.id });
  res.status(204).send();
};
