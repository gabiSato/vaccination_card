defmodule VaccinationCard.Repo.Migrations.CreateChildren do
  use Ecto.Migration

  def change do
    create table(:children) do
      add :cpf, :string
      add :name, :string

      timestamps()
    end

    create unique_index(:children, [:cpf])
  end
end
