class PuzzlesController < ApplicationController
  before_action :set_puzzle, only: [:show, :edit, :update, :destroy]

  # GET /puzzles
  # GET /puzzles.json
  def index
    @puzzles = Puzzle.all
  end

  # GET /puzzles/1
  # GET /puzzles/1.json
  def show
    @piecesNumber = 6
    @piecesNumberArray = (1..@piecesNumber).to_a.shuffle
    @piecesNumberWidth = 3
    @piecesNumberHeight = 2

    if params[:piecesnumber] !=  nil
      @piecesNumber = params[:piecesnumber].to_i
      @piecesNumberArray = (1..@piecesNumber).to_a.shuffle
      @piecesNumberWidth = params[:piecesnumberwidth].to_i
      @piecesNumberHeight = params[:piecesnumberheight].to_i
    end

    @category = Category.find(@puzzle.category_id)

    puzzle_array_ids = Puzzle.where(category_id: @puzzle.category_id).pluck(:id)
    puzzle_array_ids.delete(@puzzle.id)
    random_puzzle_ids = puzzle_array_ids.sample(4)
    @random_puzzles =  Puzzle.where(id: random_puzzle_ids)

    category_array_ids = Category.pluck(:id)
    category_array_ids.delete(@puzzle.category_id)
    random_category_ids = category_array_ids.sample(4)
    @random_categories = Category.where(id: random_category_ids)

    respond_to do |format|
      format.html
      format.js
    end
  end

  # GET /puzzles/new
  def new
    @puzzle = Puzzle.new
  end

  # GET /puzzles/1/edit
  def edit
  end

  # POST /puzzles
  # POST /puzzles.json
  def create
    @puzzle = Puzzle.new(puzzle_params)

    respond_to do |format|
      if @puzzle.save
        format.html { redirect_to @puzzle, notice: 'Puzzle was successfully created.' }
        format.json { render :show, status: :created, location: @puzzle }
      else
        format.html { render :new }
        format.json { render json: @puzzle.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /puzzles/1
  # PATCH/PUT /puzzles/1.json
  def update
    respond_to do |format|
      if @puzzle.update(puzzle_params)
        format.html { redirect_to @puzzle, notice: 'Puzzle was successfully updated.' }
        format.json { render :show, status: :ok, location: @puzzle }
      else
        format.html { render :edit }
        format.json { render json: @puzzle.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /puzzles/1
  # DELETE /puzzles/1.json
  def destroy
    @puzzle.destroy
    respond_to do |format|
      format.html { redirect_to puzzles_url, notice: 'Puzzle was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_puzzle
      @puzzle = Puzzle.find_by(name: params[:name].capitalize)
    end

    # Only allow a list of trusted parameters through.
    def puzzle_params
      params.require(:puzzle).permit(:name, :image_url)
    end
end
