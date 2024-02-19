class AnswersController < ApplicationController
    before_action :set_quiz
    before_action :set_question
    before_action :set_answer, only: [:show, :edit, :update, :destroy]
  
    def index
      @answers = @question.answers
    end
  
    def show
      # @answer is already set by before_action
    end
  
    def new
      @answer = @question.answers.build
    end
  
    def create
      @answer = @question.answers.build(answer_params)
  
      if @answer.save
        redirect_to quiz_question_answers_path(@quiz, @question), notice: 'Answer was successfully created.'
      else
        render :new
      end
    end
  
    def edit
      # @answer is already set by before_action
    end
  
    def update
      if @answer.update(answer_params)
        redirect_to quiz_question_answers_path(@quiz, @question), notice: 'Answer was successfully updated.'
      else
        render :edit
      end
    end
  
    def destroy
      @answer.destroy
      redirect_to quiz_question_answers_path(@quiz, @question), notice: 'Answer was successfully destroyed.'
    end
  
    private
  
    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end
  
    def set_question
      @question = @quiz.questions.find(params[:question_id])
    end
  
    def set_answer
      @answer = @question.answers.find(params[:id])
    end
  
    def answer_params
      params.require(:answer).permit(:content, :correct)
    end
  end
  
