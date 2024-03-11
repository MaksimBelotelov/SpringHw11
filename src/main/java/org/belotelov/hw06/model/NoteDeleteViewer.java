package org.belotelov.hw06.model;

import org.springframework.stereotype.Component;

@Component
public class NoteDeleteViewer implements NoteObserver {
    public void update() {
        System.out.println("Я наблюдатель. Я видел! Была удалена заметка!");
    }
}
