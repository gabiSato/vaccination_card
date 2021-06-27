defmodule VaccinationCardWeb.VaccinationsController do
  use VaccinationCardWeb, :controller

  alias VaccinationCard.{ Vaccinations.Vaccination, Vaccinations }

  def child_vaccinations(conn, %{"id" => child_id}) do
    with vaccinations <- Vaccinations.list_vaccinations_from_child(child_id) do
      conn
      |> put_status(:ok)
      |> render("child_vaccinations.json", vaccinations: vaccinations)
    end
  end

  def create(conn, params) do
    with {:ok, %Vaccination{} = vaccination} <- Vaccinations.create_vaccination(params) do
      conn
      |> put_status(:created)
      |> render("create.json", vaccination: vaccination)
    end
  end

  def delete(conn, %{"id" => id}) do
    vaccination_to_delete = Vaccinations.get_vaccination!(id)

    with {:ok, _result} <- Vaccinations.delete_vaccination(vaccination_to_delete) do
      conn
      |> put_status(:ok)
      |> render("delete.json")
    end
  end
end
