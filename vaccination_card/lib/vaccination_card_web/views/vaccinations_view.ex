defmodule VaccinationCardWeb.VaccinationsView do
  use VaccinationCardWeb, :view

  alias VaccinationCardWeb.VaccinationsView

  def render("child_vaccinations.json", %{vaccinations: vaccinations}) do
    %{vaccinations: render_many(vaccinations, VaccinationsView, "vaccination.json", as: :vaccination)}
  end

  def render("create.json", %{vaccination: vaccination}) do
    %{
      message: "Vaccination created!",
      vaccination: vaccination
    }
  end

  def render("delete.json", _params) do
    %{ message: "Vaccination deleted!" }
  end

  def render("vaccination.json", %{vaccination: vaccination}) do
    %{
      id: vaccination.id,
      date: vaccination.date,
      batch: vaccination.batch,
      nurse: vaccination.nurse,
      vaccine: vaccination.vaccine
    }
  end
end
