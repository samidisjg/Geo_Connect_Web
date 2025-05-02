import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from "../../components/FlagCard.jsx";
import '@testing-library/jest-dom';

const mockCountry = {
  name: { common: "Sri Lanka" },
  flags: { svg: "https://flagcdn.com/lk.svg" },
  capital: ["Sri Jayawardenepura Kotte"],
  population: 21803000,
  languages: { sin: "Sinhala", tam: "Tamil" },
  region: "Asia",
};

describe("CountryCard", () => {
  it("renders country details correctly", () => {
    render(<CountryCard country={mockCountry} onSelect={() => {}} />);

    expect(screen.getAllByText("Sri Lanka").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Capital:")).toBeInTheDocument();
    expect(screen.getByText("Sri Jayawardenepura Kotte")).toBeInTheDocument();
    expect(screen.getByText("Population:")).toBeInTheDocument();
    expect(screen.getByText("21,803,000")).toBeInTheDocument();
    expect(screen.getByText("Language:")).toBeInTheDocument();
    expect(screen.getByText("Sinhala, Tamil")).toBeInTheDocument();
    expect(screen.getByText("Asia")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const handleClick = jest.fn();
    render(<CountryCard country={mockCountry} onSelect={handleClick} />);
    fireEvent.click(screen.getByText("Sri Lanka"));
    expect(handleClick).toHaveBeenCalled();
  });
});

