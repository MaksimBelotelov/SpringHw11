package org.belotelov.hw06.controller;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.Metrics;
import lombok.AllArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.belotelov.hw06.model.Note;
import org.belotelov.hw06.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@AllArgsConstructor
@RequestMapping("/notes")
public class NoteController {
    private NoteService noteService;

    private final Counter notesCounter = Metrics.counter("add_note_count");


    @GetMapping
    public ResponseEntity<List<Note>> findAll() {
        return new ResponseEntity<>(noteService.findAllNotes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> findNoteById(@PathVariable("id") Long id) {
        Note note = null;
        try {
            note = noteService.getNoteById(id);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Note());
        }
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Note> createNewNote(@RequestBody Note newNote) {
        notesCounter.increment();
        return new ResponseEntity<>(noteService.createNote(newNote), HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable("id") Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Note> updateProduct(@RequestBody Note note,
                                              @PathVariable("id") Long id) {
        return new ResponseEntity<>(noteService.updateNote(note, id), HttpStatus.OK);
    }
}