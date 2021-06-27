defmodule VaccinationCard.Vaccinations do
  @moduledoc """
  The Vaccinations context.
  """

  import Ecto.Query, warn: false
  alias VaccinationCard.Repo

  alias VaccinationCard.{Vaccinations.Vaccination, Vaccines.Vaccine, Children.Child}

  @doc """
  Returns the list of vaccinations.

  ## Examples

      iex> list_vaccinations()
      [%Vaccination{}, ...]

  """
  def list_vaccinations do
    Repo.all(Vaccination)
  end

  def list_vaccinations_from_child(child_id) do
    query =
      from vaccination in Vaccination,
        where:
          vaccination.child_id == ^child_id

    query |> Repo.all() |> Repo.preload([:child, :vaccine])
  end

  @doc """
  Gets a single vaccination.

  Raises `Ecto.NoResultsError` if the Vaccination does not exist.

  ## Examples

      iex> get_vaccination!(123)
      %Vaccination{}

      iex> get_vaccination!(456)
      ** (Ecto.NoResultsError)

  """
  def get_vaccination!(id), do: Repo.get!(Vaccination, id)

  @doc """
  Creates a vaccination.

  ## Examples

      iex> create_vaccination(%{field: value})
      {:ok, %Vaccination{}}

      iex> create_vaccination(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_vaccination(attrs \\ %{}) do
    %Vaccination{}
    |> Vaccination.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a vaccination.

  ## Examples

      iex> update_vaccination(vaccination, %{field: new_value})
      {:ok, %Vaccination{}}

      iex> update_vaccination(vaccination, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_vaccination(%Vaccination{} = vaccination, attrs) do
    vaccination
    |> Vaccination.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a vaccination.

  ## Examples

      iex> delete_vaccination(vaccination)
      {:ok, %Vaccination{}}

      iex> delete_vaccination(vaccination)
      {:error, %Ecto.Changeset{}}

  """
  def delete_vaccination(%Vaccination{} = vaccination) do
    Repo.delete(vaccination)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking vaccination changes.

  ## Examples

      iex> change_vaccination(vaccination)
      %Ecto.Changeset{data: %Vaccination{}}

  """
  def change_vaccination(%Vaccination{} = vaccination, attrs \\ %{}) do
    Vaccination.changeset(vaccination, attrs)
  end
end
