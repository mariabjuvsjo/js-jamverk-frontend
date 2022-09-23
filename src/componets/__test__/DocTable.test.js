import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocTable from "../DocTable";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const testDoc = {
    name: "test",
    text: "testing test"

};

test("render docs", () => {
    render(<BrowserRouter>
        <Routes>
            <Route path="/" element={<DocTable doc={testDoc} />} />
        </Routes>
    </BrowserRouter>);
    const textContent = screen.getByText(/test/i);
    expect(textContent).toBeInTheDocument();
})