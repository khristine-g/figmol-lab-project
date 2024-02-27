class QuestionsController < ApplicationController
  before_action :set_quiz
  before_action :set_question, only: [:show, :edit, :update, :destroy]

  def index
    @questions = @quiz.questions
  end

  def show
    # @question is already set by before_action
  end

  def new
    @question = @quiz.questions.build
  end

  def create
    @question = @quiz.questions.build(question_params)

    if @question.save
      render json: @question, status: :created
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def edit
    # @question is already set by before_action
  end

  def update
    if @question.update(question_params)
      redirect_to quiz_questions_path(@quiz), notice: 'Question was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @question
      @question.destroy
      render json: { message: 'Question was successfully destroyed.' }
    else
      render json: { error: 'Question not found.' }, status: :not_found
    end
  end

  private

  # def set_quiz
  #   @quiz = Quiz.find_by(title: params[:quiz_id])

  #   # Handle the case where the quiz is not found
  #   unless @quiz
  #     render json: { error: 'Quiz not found.' }, status: :not_found
  #   end
  # end

  def set_quiz
    @quiz = Quiz.find_by(title: params[:quiz_id])
    # Handle the case where the quiz is not found
    unless @quiz
      render json: { error: 'Quiz not found.' }, status: :not_found
    end
  end
  

  def set_question
    @question = @quiz&.questions&.find_by(id: params[:id])

    # Handle the case where the question is not found
    unless @question
      render json: { error: 'Question not found.' }, status: :not_found
    end
  end


  def question_params
    params.require(:question).permit(:content)
  end
end


# class QuestionsController < ApplicationController
#     before_action :set_quiz
#     before_action :set_question, only: [:show, :edit, :update, :destroy]
  
#     def index
#       @questions = @quiz.questions
#     end
  
#     def show
#       # @question is already set by before_action
#     end
  
#     def new
#       @question = @quiz.questions.build
#     end
  
#     def create
#       @question = @quiz.questions.build(question_params)
  
#       if @question.save
#         render json: @question, status: :created
#       else
#         render json: @question.errors, status: :unprocessable_entity
#       end
#     end
  
#     def edit
#       # @question is already set by before_action
#     end
  
#     def update
#       if @question.update(question_params)
#         redirect_to quiz_questions_path(@quiz), notice: 'Question was successfully updated.'
#       else
#         render :edit
#       end
#     end
  
#     def destroy
#       if @question
#         @question.destroy
#         render json: { message: 'Question was successfully destroyed.' }
#       else
#         render json: { error: 'Question not found.' }, status: :not_found
#       end
#     end
  
#     private
  
#     def set_quiz
#       @quiz = Quiz.find_by(title: params[:quiz_id])
    
#       # Handle the case where the quiz is not found
#       unless @quiz
#         render json: { error: 'Quiz not found.' }, status: :not_found
#       end
#     end
    
    
    
    
    
#   def set_question
#     @question = @quiz&.questions&.find(params[:id])

#     # Handle the case where the question is not found
#     unless @question
#       render json: { error: 'Question not found.' }, status: :not_found
#     end
#   end
  
#     def question_params
#       params.require(:question).permit(:content)
#     end
#   end

  
