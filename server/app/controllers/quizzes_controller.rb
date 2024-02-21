class QuizzesController < ApplicationController
    before_action :set_quiz, only: [:show, :edit, :update, :destroy]
  
    def index
      @quizzes = Quiz.includes(questions: :answers).all
      render json: @quizzes, include: { questions: { include: :answers } }
    end
  
    def show
      @quiz = Quiz.includes(questions: :answers).find_by(title: params[:id])
      render json: @quiz, include: { questions: { include: :answers } }
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
      puts "Received title parameter: #{params[:title]}"
      @quiz = Quiz.includes(questions: :answers).find_by(title: params[:title])
    
      if @quiz
        render json: @quiz, include: { questions: { include: :answers } }
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
      if @quiz.destroy
        render json: { message: 'Quiz deleted successfully' }, status: :ok
      else
        render json: { error: 'Failed to delete quiz' }, status: :unprocessable_entity
      end
    end

  
    private
  
    def set_quiz
      @quiz = Quiz.find_by(title: params[:id])
    end
  
    def quiz_params
      params.require(:quiz).permit(
        :title,
        questions_attributes: [
          :content,
          answers_attributes: [:content, :correct]
        ]
      )
      end
  end
  