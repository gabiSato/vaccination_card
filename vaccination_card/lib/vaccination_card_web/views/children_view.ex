defmodule VaccinationCardWeb.ChildrenView do
  use VaccinationCardWeb, :view

  def render("index.json", %{children: children}) do
    %{ children: children }
  end

  def render("create.json", %{child: child}) do
    %{
      message: "Child created!",
      child: child
    }
  end

  def render("show.json", %{child: child}) do
    %{ child: child }
  end

  def render("update.json", %{child: child}) do
    %{
      message: "Child updated!",
      child: child
    }
  end

  def render("delete.json", _params) do
    %{ message: "Child deleted!" }
  end
end
