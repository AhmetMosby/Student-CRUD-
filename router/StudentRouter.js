const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel');


router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      if (!student) {
        return res.status(404).json({ message: 'Öğrenci bulunamadı' });
      }
      res.json(student);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});


router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade,
    address: req.body.address,
    email: req.body.email
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ status: false, message: 'Öğrenci bulunamadı' });
    }
    res.status(200).json({ status: true, message: 'Öğrenci silindi' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});


router.put('/', async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    if (!id) {
      return res.status(404).json({ status: false, message: 'Güncellenecek öğrencinin ID bilgisi eksik' });
    }
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ status: false, message: 'Öğrenci bulunamadı' });
    }
    res.status(200).json({ status: true, message: 'Öğrenci güncellendi', updatedStudent });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
