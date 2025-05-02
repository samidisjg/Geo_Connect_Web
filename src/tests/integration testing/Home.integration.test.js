import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../../Pages/HomePage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import React from "react";
import '@testing-library/jest-dom';

// Mock component for the target route
const MockSearchCountries = () => <div>Search Countries Page</div>;

// Helper to render with router and routes
const renderWithRouter = (ui) => {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={ui} />
        <Route path="/searchCountries" element={<MockSearchCountries />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("HomePage component", () => {
  test("renders hero section content", () => {
    renderWithRouter(<HomePage />);

    expect(
      screen.getByText(/World at Your Fingertips with GeoConnect/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your Interactive Window to the World/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Let's Explore/i })).toBeInTheDocument();
  });

  test("renders features section with titles", () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByText(/Search Countries/i)).toBeInTheDocument();
    expect(screen.getByText(/Detailed Statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/Rich Information/i)).toBeInTheDocument();
  });

  test("navigates to search page when 'Let's Explore' button is clicked", () => {
    renderWithRouter(<HomePage />);
    fireEvent.click(screen.getByRole("button", { name: /Let's Explore/i }));
    expect(screen.getByText(/Search Countries Page/i)).toBeInTheDocument();
  });

  test("navigates to search page when 'Explore All Features' button is clicked", () => {
    renderWithRouter(<HomePage />);
    fireEvent.click(screen.getByRole("button", { name: /Explore All Features/i }));
    expect(screen.getByText(/Search Countries Page/i)).toBeInTheDocument();
  });

  test("navigates to search page when 'Start Exploring' button is clicked", () => {
    renderWithRouter(<HomePage />);
    fireEvent.click(screen.getByRole("button", { name: /Start Exploring/i }));
    expect(screen.getByText(/Search Countries Page/i)).toBeInTheDocument();
  });
});

