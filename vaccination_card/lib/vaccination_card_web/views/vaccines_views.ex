defmodule VaccinationCardWeb.VaccinesView do
  use VaccinationCardWeb, :view

  def render("index.json", %{vaccines: vaccines}) do
    %{ vaccines: vaccines }
  end

  def render("create.json", %{vaccine: vaccine}) do
    %{
      message: "Vaccine created!",
      vaccine: vaccine
    }
  end

  def render("show.json", %{vaccine: vaccine}) do
    %{ vaccine: vaccine }
  end

  def render("update.json", %{vaccine: vaccine}) do
    %{
      message: "Vaccine updated!",
      vaccine: vaccine
    }
  end

  def render("delete.json", _params) do
    %{ message: "Vaccine deleted!" }
  end
end
