const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../model/Notes');
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(400).send("some error occured");
    }

})

//route 2 to add a note
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(400).send("some error occured");
    }

})

//update the note...Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) { newnote.title = title };
    if (description) { newnote.description = description };
    if (tag) { newnote.tag = tag };
    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note not found");
    }
    //checking if the same person logged in updating his notes
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json(note);
})
//deleting the note...Login req
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }
        //checking if the same person logged in updating his notes
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(400).send("some error occured");
    }
})
module.exports = router;