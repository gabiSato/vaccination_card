defmodule VaccinationCard.Vaccines.Vaccine do
  use Ecto.Schema
  import Ecto.Changeset

  alias VaccinationCard.Vaccinations.Vaccination

  @primary_key {:id, :binary_id, autogenerate: true}

  @required_params [:name, :manufacturer, :description]

  @derive {Jason.Encoder, only: @required_params ++ [:id]}

  schema "vaccines" do
    field :description, :string
    field :manufacturer, :string
    field :name, :string

    has_many :vaccinations, Vaccination

    timestamps()
  end

  @doc false
  def changeset(vaccine, attrs) do
    vaccine
    |> cast(attrs, @required_params)
    |> validate_required(@required_params)
  end
end
