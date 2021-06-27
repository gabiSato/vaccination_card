defmodule VaccinationCard.Children.Child do
  use Ecto.Schema
  import Ecto.Changeset

  alias VaccinationCard.Vaccinations.Vaccination

  @primary_key {:id, :binary_id, autogenerate: true}

  @required_params [:cpf, :name]

  @derive {Jason.Encoder, only: @required_params ++ [:id]}

  schema "children" do
    field :cpf, :string
    field :name, :string

    has_many :vaccinations, Vaccination

    timestamps()
  end

  @doc false
  def changeset(child, attrs) do
    child
    |> cast(attrs, @required_params)
    |> validate_required(@required_params)
    |> unique_constraint([:cpf])
  end
end
