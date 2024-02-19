class QuizzesController < ApplicationController
    before_action :set_quiz, only: [:show, :edit, :update, :destroy]
  
    def index
      @quizzes = Quiz.all
      render json: @quizzes
    end
  
    def show
      # @quiz is already set by before_action
    end
  
    def new
      @quiz = Quiz.new
    end
  
    def create
        @quiz = Quiz.new(quiz_params)
    
        if @quiz.save
          render json: @quiz, status: :created
        else
          render json: @quiz.errors, status: :unprocessable_entity
        end
      end

      def create_quiz
       
        @quiz = Quiz.new(quiz_params)
    
        if @quiz.save
          render json: @quiz, status: :created
        else
          render json: @quiz.errors, status: :unprocessable_entity
        end
      end
  
    def edit
      # @quiz is already set by before_action
    end

    def show_by_title
        @quiz = Quiz.find_by(title: params[:title])
    
        if @quiz
          render json: @quiz
        else
          render json: { error: 'Quiz not found' }, status: :not_found
        end
      end
  
    def update
      if @quiz.update(quiz_params)
        redirect_to @quiz, notice: 'Quiz was successfully updated.'
      else
        render :edit
      end
    end
  
    def destroy
      @quiz.destroy
      redirect_to quizzes_url, notice: 'Quiz was successfully destroyed.'
    end


  
    private
  
    def set_quiz
      @quiz = Quiz.find(params[:id])
    end
  
    def quiz_params
        params.require(:quiz).permit(:title, questions_attributes: [:content, answers_attributes: [:content, :correct]])
      end
  end
  