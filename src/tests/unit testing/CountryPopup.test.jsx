import React from "react";
import { render, screen } from "@testing-library/react";
import CountryDetailModal from "../../components/CountryPopup.jsx";
// src/setupTests.js
import '@testing-library/jest-dom';


const mockCountry = {
  name: { common: "Sri Lanka" },
  flags: { svg: "https://flagcdn.com/lk.svg" },
  capital: ["Sri Jayawardenepura Kotte"],
  region: "Asia",
  subregion: "Southern Asia",
  population: 21803000,
  area: 65610,
  languages: { sin: "Sinhala", tam: "Tamil" },
  timezones: ["UTC+05:30"],
  startOfWeek: "monday",
  independent: true,
  status: "officially-assigned",
  tld: [".lk"],
  cca2: "LK",
  cca3: "LKA",
};

describe("CountryDetailModal", () => {
  it("renders modal with country details", () => {
    render(
      <CountryDetailModal showModal={true} onClose={() => {}} country={mockCountry} />
    );

    expect(screen.getAllByText("Sri Lanka").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Capital")).toBeInTheDocument();
    expect(screen.getByText("Sri Jayawardenepura Kotte")).toBeInTheDocument();
    expect(screen.getByText("Population")).toBeInTheDocument();
    expect(screen.getByText("21,803,000")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Sinhala, Tamil")).toBeInTheDocument();
    expect(screen.getByText("Top-Level Domain")).toBeInTheDocument();
    expect(screen.getByText(".lk")).toBeInTheDocument();
  });

  it("does not render modal when no country is passed", () => {
    const { container } = render(
      <CountryDetailModal showModal={true} onClose={() => {}} country={null} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

