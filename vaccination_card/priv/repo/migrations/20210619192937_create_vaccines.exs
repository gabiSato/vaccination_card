defmodule VaccinationCard.Repo.Migrations.CreateVaccines do
  use Ecto.Migration

  def change do
    create table(:vaccines) do
      add :name, :string
      add :manufacturer, :string
      add :description, :string

      timestamps()
    end

  end
end
