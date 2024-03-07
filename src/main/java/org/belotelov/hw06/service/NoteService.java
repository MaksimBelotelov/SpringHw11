package org.belotelov.hw06.service;

import lombok.AllArgsConstructor;
import org.aspectj.weaver.ast.Not;
import org.belotelov.hw06.model.Note;
import org.belotelov.hw06.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class NoteService {
    private NoteRepository noteRepository;

    public List<Note> findAllNotes() {
        return noteRepository.findAll();
    }
    public Note createNote(Note note) { return noteRepository.save(note); }
    public void deleteNote(Long id) { noteRepository.deleteById(id); }
    public Note getNoteById(Long id) { return noteRepository.findById(id).orElseThrow(null); }
    public Note updateNote(Note note, Long id) {
        Note noteToUpdate = getNoteById(id);
        noteToUpdate.setTitle(note.getTitle());
        noteToUpdate.setContent(note.getContent());
        return noteRepository.save(noteToUpdate);
    }
}
