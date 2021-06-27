defmodule VaccinationCardWeb.ChildrenController do
  use VaccinationCardWeb, :controller

  alias VaccinationCard.{ Children.Child, Children }

  def index(conn, _params) do
    with children <- Children.list_children() do
      conn
      |> put_status(:ok)
      |> render("index.json", children: children)
    end
  end

  def create(conn, params) do
    with {:ok, %Child{} = child} <- Children.create_child(params) do
      conn
      |> put_status(:created)
      |> render("create.json", child: child)
    end
  end

  def show(conn, %{"id" => id}) do
    with %Child{} = child <- Children.get_child!(id) do
      conn
      |> put_status(:ok)
      |> render("show.json", child: child)
    end
  end

  def update(conn, %{"id" => id, "name" => name, "cpf" => cpf}) do
    child_to_update = Children.get_child!(id)

    with {:ok, %Child{} = child} <- Children.update_child(child_to_update, %{"name" => name, "cpf" => cpf}) do
      conn
      |> put_status(:ok)
      |> render("update.json", child: child)
    end
  end

  def delete(conn, %{"id" => id}) do
    child_to_delete = Children.get_child!(id)

    with {:ok, _result} <- Children.delete_child(child_to_delete) do
      conn
      |> put_status(:ok)
      |> render("delete.json")
    end
  end
end
