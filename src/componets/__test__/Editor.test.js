import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "../Editor";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


test("render label og input", () => {
    const comp = render(<BrowserRouter>
        <Routes>
            <Route path="/" element={<Editor />} />
        </Routes>
    </BrowserRouter>);
    const labelEl = comp.getByTestId("labelInput");

    expect(labelEl.textContent).toBe("Name of Document:")

})

test("input field is empty when create new doc", () => {
    const comp = render(<BrowserRouter>
        <Routes>
            <Route path="/" element={<Editor />} />
        </Routes>
    </BrowserRouter>);
    const labelEl = comp.getByTestId("input");

    expect(labelEl.textContent).toBe("")

})

test("input field is not empty after typing", () => {
    const comp = render(<BrowserRouter>
        <Routes>
            <Route path="/" element={<Editor />} />
        </Routes>
    </BrowserRouter>);
    const labelEl = comp.getByTestId("input");

    expect(labelEl.value).toBe("")

    fireEvent.change(labelEl, {
        target: {
            value: "hello"
        }
    })

    expect(labelEl.value).toBe("hello")

})

