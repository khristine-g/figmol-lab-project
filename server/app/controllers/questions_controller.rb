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
      @question.destroy
      render json: { message: 'Question was successfully destroyed.' }
    end
  
    private
  
    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end
    
    
    def set_question
      @question = @quiz.questions.find(params[:id])
    end
  
    def question_params
      params.require(:question).permit(:content)
    end
  end
  
