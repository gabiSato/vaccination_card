defmodule VaccinationCard.Repo.Migrations.CreateVaccinations do
  use Ecto.Migration

  def change do
    create table(:vaccinations) do
      add :batch, :string
      add :date, :date
      add :nurse, :string
      add :child_id, references(:children, type: :binary_id)
      add :vaccine_id, references(:vaccines, type: :binary_id)

      timestamps()
    end

  end
end
