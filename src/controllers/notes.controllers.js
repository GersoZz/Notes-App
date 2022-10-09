const notesCtrl = {};

const Note = require("../models/Note");

notesCtrl.renderNoteForm = async (req, res) => {
  /*   console.log(req.user);
  console.log(req.user.id); */
  res.render("notes/new-note"); /* / */
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description });
  newNote.user = req.user.id; //puedo pedir ._id tambien//P req.user passport?
  await newNote.save();

  req.flash("success_msg", "Note Added Successfully");
  res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
  //const notes = await Note.find().lean();
  const notes = await Note.find({ user: req.user.id })
    .sort({ createdAt: "desc" })
    .lean();
  //.sort({createdAt: 'desc'});
  res.render("notes/all-notes", { notes });
  //  res.send("render notes");
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();//P ver findOne 
  //  console.log(note);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");/* return ? mmm */
  }
  res.render("notes/edit-notes", { note });
};

notesCtrl.updateNote = async (req, res) => {
  //console.log(req.body);
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  /* validar usuario */
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/notes");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  /* validar usuario */
  req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/notes");
};

module.exports = notesCtrl;
