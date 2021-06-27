defmodule VaccinationCardWeb.VaccinesController do
  use VaccinationCardWeb, :controller

  alias VaccinationCard.{ Vaccines.Vaccine, Vaccines }

  def index(conn, _params) do
    with vaccines <- Vaccines.list_vaccines() do
      conn
      |> put_status(:ok)
      |> render("index.json", vaccines: vaccines)
    end
  end

  def create(conn, params) do
    with {:ok, %Vaccine{} = vaccine} <- Vaccines.create_vaccine(params) do
      conn
      |> put_status(:created)
      |> render("create.json", vaccine: vaccine)
    end
  end

  def show(conn, %{"id" => id}) do
    with %Vaccine{} = vaccine <- Vaccines.get_vaccine!(id) do
      conn
      |> put_status(:ok)
      |> render("show.json", vaccine: vaccine)
    end
  end

  def update(conn, %{"id" => id, "name" => name, "manufacturer" => manufacturer, "description" => description}) do
    vaccine_to_update = Vaccines.get_vaccine!(id)

    attrs =  %{"name" => name, "manufacturer" => manufacturer, "description" => description}

    with {:ok, %Vaccine{} = vaccine} <- Vaccines.update_vaccine(vaccine_to_update, attrs) do
      conn
      |> put_status(:ok)
      |> render("update.json", vaccine: vaccine)
    end
  end

  def delete(conn, %{"id" => id}) do
    vaccine_to_delete = Vaccines.get_vaccine!(id)

    with {:ok, _result} <- Vaccines.delete_vaccine(vaccine_to_delete) do
      conn
      |> put_status(:ok)
      |> render("delete.json")
    end
  end
end
