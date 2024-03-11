package org.belotelov.hw06.model;

public interface NoteSubject {
    void addObserver(NoteObserver observer);
    void removeObserver(NoteObserver observer);
    void notifyObservers();
}
