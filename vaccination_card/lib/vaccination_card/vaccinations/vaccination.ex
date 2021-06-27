defmodule VaccinationCard.Vaccinations.Vaccination do
  use Ecto.Schema
  import Ecto.Changeset

  alias VaccinationCard.Children.Child
  alias VaccinationCard.Vaccines.Vaccine

  @primary_key {:id, :binary_id, autogenerate: true}

  @foreign_key_type :binary_id

  @required_params [:batch, :date, :nurse, :child_id, :vaccine_id]

  @derive {Jason.Encoder, only: @required_params ++ [:id]}

  schema "vaccinations" do
    field :batch, :string
    field :date, :date
    field :nurse, :string

    belongs_to :child, Child
    belongs_to :vaccine, Vaccine

    timestamps()
  end

  @doc false
  def changeset(vaccination, attrs) do
    vaccination
    |> cast(attrs, @required_params)
    |> validate_required(@required_params)
  end
end
