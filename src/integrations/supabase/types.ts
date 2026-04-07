export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contract_advisor_responses: {
        Row: {
          created_at: string | null
          id: string
          intro_question_answer: string | null
          is_completed: boolean | null
          percentage_dynamisch: number | null
          percentage_variabel: number | null
          percentage_vast1: number | null
          percentage_vast3: number | null
          q1_feedback_rating: number | null
          q1_feedback_text: string | null
          q1_selected_option_id: number | null
          q1_selected_option_text: string | null
          q2_feedback_rating: number | null
          q2_feedback_text: string | null
          q2_selected_option_id: number | null
          q2_selected_option_text: string | null
          q3_feedback_rating: number | null
          q3_feedback_text: string | null
          q3_selected_option_id: number | null
          q3_selected_option_text: string | null
          q4_feedback_rating: number | null
          q4_feedback_text: string | null
          q4_selected_options: number[] | null
          q4_selected_options_text: string[] | null
          q5_feedback_rating: number | null
          q5_feedback_text: string | null
          q5_selected_options: number[] | null
          q5_selected_options_text: string[] | null
          recommended_contract_type: string | null
          score_dynamisch: number | null
          score_variabel: number | null
          score_vast1: number | null
          score_vast3: number | null
          survey_version: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          intro_question_answer?: string | null
          is_completed?: boolean | null
          percentage_dynamisch?: number | null
          percentage_variabel?: number | null
          percentage_vast1?: number | null
          percentage_vast3?: number | null
          q1_feedback_rating?: number | null
          q1_feedback_text?: string | null
          q1_selected_option_id?: number | null
          q1_selected_option_text?: string | null
          q2_feedback_rating?: number | null
          q2_feedback_text?: string | null
          q2_selected_option_id?: number | null
          q2_selected_option_text?: string | null
          q3_feedback_rating?: number | null
          q3_feedback_text?: string | null
          q3_selected_option_id?: number | null
          q3_selected_option_text?: string | null
          q4_feedback_rating?: number | null
          q4_feedback_text?: string | null
          q4_selected_options?: number[] | null
          q4_selected_options_text?: string[] | null
          q5_feedback_rating?: number | null
          q5_feedback_text?: string | null
          q5_selected_options?: number[] | null
          q5_selected_options_text?: string[] | null
          recommended_contract_type?: string | null
          score_dynamisch?: number | null
          score_variabel?: number | null
          score_vast1?: number | null
          score_vast3?: number | null
          survey_version?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          intro_question_answer?: string | null
          is_completed?: boolean | null
          percentage_dynamisch?: number | null
          percentage_variabel?: number | null
          percentage_vast1?: number | null
          percentage_vast3?: number | null
          q1_feedback_rating?: number | null
          q1_feedback_text?: string | null
          q1_selected_option_id?: number | null
          q1_selected_option_text?: string | null
          q2_feedback_rating?: number | null
          q2_feedback_text?: string | null
          q2_selected_option_id?: number | null
          q2_selected_option_text?: string | null
          q3_feedback_rating?: number | null
          q3_feedback_text?: string | null
          q3_selected_option_id?: number | null
          q3_selected_option_text?: string | null
          q4_feedback_rating?: number | null
          q4_feedback_text?: string | null
          q4_selected_options?: number[] | null
          q4_selected_options_text?: string[] | null
          q5_feedback_rating?: number | null
          q5_feedback_text?: string | null
          q5_selected_options?: number[] | null
          q5_selected_options_text?: string[] | null
          recommended_contract_type?: string | null
          score_dynamisch?: number | null
          score_variabel?: number | null
          score_vast1?: number | null
          score_vast3?: number | null
          survey_version?: string | null
        }
        Relationships: []
      }
      contract_advisor_responses_backup: {
        Row: {
          answers: Json | null
          created_at: string | null
          id: string | null
          is_completed: boolean | null
          last_answered_question_id: number | null
          match_percentages: Json | null
          recommended_contract_type: string | null
          survey_version: string | null
          total_questions: number | null
        }
        Insert: {
          answers?: Json | null
          created_at?: string | null
          id?: string | null
          is_completed?: boolean | null
          last_answered_question_id?: number | null
          match_percentages?: Json | null
          recommended_contract_type?: string | null
          survey_version?: string | null
          total_questions?: number | null
        }
        Update: {
          answers?: Json | null
          created_at?: string | null
          id?: string | null
          is_completed?: boolean | null
          last_answered_question_id?: number | null
          match_percentages?: Json | null
          recommended_contract_type?: string | null
          survey_version?: string | null
          total_questions?: number | null
        }
        Relationships: []
      }
      contract_survey_responses: {
        Row: {
          answer_label: string | null
          answer_text: string | null
          answer_type: string
          contract_match_scores: Json | null
          created_at: string
          id: string
          question_text: string
          rating: number | null
          recommended_contract_type: string | null
        }
        Insert: {
          answer_label?: string | null
          answer_text?: string | null
          answer_type: string
          contract_match_scores?: Json | null
          created_at?: string
          id?: string
          question_text: string
          rating?: number | null
          recommended_contract_type?: string | null
        }
        Update: {
          answer_label?: string | null
          answer_text?: string | null
          answer_type?: string
          contract_match_scores?: Json | null
          created_at?: string
          id?: string
          question_text?: string
          rating?: number | null
          recommended_contract_type?: string | null
        }
        Relationships: []
      }
      post_results_feedback: {
        Row: {
          answer_text: string | null
          answer_type: string | null
          contract_response_id: string | null
          created_at: string | null
          id: string
          question_id: number | null
          question_text: string | null
          rating: number | null
        }
        Insert: {
          answer_text?: string | null
          answer_type?: string | null
          contract_response_id?: string | null
          created_at?: string | null
          id?: string
          question_id?: number | null
          question_text?: string | null
          rating?: number | null
        }
        Update: {
          answer_text?: string | null
          answer_type?: string | null
          contract_response_id?: string | null
          created_at?: string | null
          id?: string
          question_id?: number | null
          question_text?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_results_feedback_contract_response_id_fkey"
            columns: ["contract_response_id"]
            isOneToOne: false
            referencedRelation: "contract_advisor_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      post_results_survey_backup: {
        Row: {
          answer_text: string | null
          answer_type: string | null
          created_at: string | null
          id: string | null
          question_text: string | null
          rating: number | null
        }
        Insert: {
          answer_text?: string | null
          answer_type?: string | null
          created_at?: string | null
          id?: string | null
          question_text?: string | null
          rating?: number | null
        }
        Update: {
          answer_text?: string | null
          answer_type?: string | null
          created_at?: string | null
          id?: string | null
          question_text?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      survey_feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          id: string
          question_id: number
          rating: number | null
          survey_response_id: string | null
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          question_id: number
          rating?: number | null
          survey_response_id?: string | null
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          question_id?: number
          rating?: number | null
          survey_response_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_feedback_survey_response_id_fkey"
            columns: ["survey_response_id"]
            isOneToOne: false
            referencedRelation: "survey_responses"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          created_at: string
          id: string
          question_id: number
          selected_score: Json
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: number
          selected_score: Json
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: number
          selected_score?: Json
        }
        Relationships: []
      }
      user_responses_v1: {
        Row: {
          created_at: string
          id: string
          intro_question_answer: string | null
          intro_question_id: string | null
          is_completed: boolean | null
          percentage_dynamisch: number | null
          percentage_variabel: number | null
          percentage_vast1: number | null
          percentage_vast3: number | null
          post_q1_answer: string | null
          post_q1_answer_type: string | null
          post_q1_followup_text: string | null
          post_q1_rating: number | null
          post_q1_text: string | null
          post_q2_answer: string | null
          post_q2_answer_type: string | null
          post_q2_followup_text: string | null
          post_q2_rating: number | null
          post_q2_text: string | null
          post_q3_answer: string | null
          post_q3_answer_type: string | null
          post_q3_followup_text: string | null
          post_q3_rating: number | null
          post_q3_text: string | null
          post_q4_answer: string | null
          post_q4_answer_type: string | null
          post_q4_followup_text: string | null
          post_q4_rating: number | null
          post_q4_text: string | null
          post_q5_answer: string | null
          post_q5_answer_type: string | null
          post_q5_followup_text: string | null
          post_q5_rating: number | null
          post_q5_text: string | null
          q1_feedback_rating: number | null
          q1_feedback_text: string | null
          q1_selected_option_id: number | null
          q1_selected_option_text: string | null
          q2_feedback_rating: number | null
          q2_feedback_text: string | null
          q2_selected_option_id: number | null
          q2_selected_option_text: string | null
          q3_feedback_rating: number | null
          q3_feedback_text: string | null
          q3_selected_option_id: number | null
          q3_selected_option_text: string | null
          q4_feedback_rating: number | null
          q4_feedback_text: string | null
          q4_selected_options_ids: string | null
          q4_selected_options_text: string | null
          q5_feedback_rating: number | null
          q5_feedback_text: string | null
          q5_selected_options_ids: string | null
          q5_selected_options_text: string | null
          recommended_contract_type: string | null
          score_dynamisch: number | null
          score_variabel: number | null
          score_vast1: number | null
          score_vast3: number | null
          survey_version: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          intro_question_answer?: string | null
          intro_question_id?: string | null
          is_completed?: boolean | null
          percentage_dynamisch?: number | null
          percentage_variabel?: number | null
          percentage_vast1?: number | null
          percentage_vast3?: number | null
          post_q1_answer?: string | null
          post_q1_answer_type?: string | null
          post_q1_followup_text?: string | null
          post_q1_rating?: number | null
          post_q1_text?: string | null
          post_q2_answer?: string | null
          post_q2_answer_type?: string | null
          post_q2_followup_text?: string | null
          post_q2_rating?: number | null
          post_q2_text?: string | null
          post_q3_answer?: string | null
          post_q3_answer_type?: string | null
          post_q3_followup_text?: string | null
          post_q3_rating?: number | null
          post_q3_text?: string | null
          post_q4_answer?: string | null
          post_q4_answer_type?: string | null
          post_q4_followup_text?: string | null
          post_q4_rating?: number | null
          post_q4_text?: string | null
          post_q5_answer?: string | null
          post_q5_answer_type?: string | null
          post_q5_followup_text?: string | null
          post_q5_rating?: number | null
          post_q5_text?: string | null
          q1_feedback_rating?: number | null
          q1_feedback_text?: string | null
          q1_selected_option_id?: number | null
          q1_selected_option_text?: string | null
          q2_feedback_rating?: number | null
          q2_feedback_text?: string | null
          q2_selected_option_id?: number | null
          q2_selected_option_text?: string | null
          q3_feedback_rating?: number | null
          q3_feedback_text?: string | null
          q3_selected_option_id?: number | null
          q3_selected_option_text?: string | null
          q4_feedback_rating?: number | null
          q4_feedback_text?: string | null
          q4_selected_options_ids?: string | null
          q4_selected_options_text?: string | null
          q5_feedback_rating?: number | null
          q5_feedback_text?: string | null
          q5_selected_options_ids?: string | null
          q5_selected_options_text?: string | null
          recommended_contract_type?: string | null
          score_dynamisch?: number | null
          score_variabel?: number | null
          score_vast1?: number | null
          score_vast3?: number | null
          survey_version?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          intro_question_answer?: string | null
          intro_question_id?: string | null
          is_completed?: boolean | null
          percentage_dynamisch?: number | null
          percentage_variabel?: number | null
          percentage_vast1?: number | null
          percentage_vast3?: number | null
          post_q1_answer?: string | null
          post_q1_answer_type?: string | null
          post_q1_followup_text?: string | null
          post_q1_rating?: number | null
          post_q1_text?: string | null
          post_q2_answer?: string | null
          post_q2_answer_type?: string | null
          post_q2_followup_text?: string | null
          post_q2_rating?: number | null
          post_q2_text?: string | null
          post_q3_answer?: string | null
          post_q3_answer_type?: string | null
          post_q3_followup_text?: string | null
          post_q3_rating?: number | null
          post_q3_text?: string | null
          post_q4_answer?: string | null
          post_q4_answer_type?: string | null
          post_q4_followup_text?: string | null
          post_q4_rating?: number | null
          post_q4_text?: string | null
          post_q5_answer?: string | null
          post_q5_answer_type?: string | null
          post_q5_followup_text?: string | null
          post_q5_rating?: number | null
          post_q5_text?: string | null
          q1_feedback_rating?: number | null
          q1_feedback_text?: string | null
          q1_selected_option_id?: number | null
          q1_selected_option_text?: string | null
          q2_feedback_rating?: number | null
          q2_feedback_text?: string | null
          q2_selected_option_id?: number | null
          q2_selected_option_text?: string | null
          q3_feedback_rating?: number | null
          q3_feedback_text?: string | null
          q3_selected_option_id?: number | null
          q3_selected_option_text?: string | null
          q4_feedback_rating?: number | null
          q4_feedback_text?: string | null
          q4_selected_options_ids?: string | null
          q4_selected_options_text?: string | null
          q5_feedback_rating?: number | null
          q5_feedback_text?: string | null
          q5_selected_options_ids?: string | null
          q5_selected_options_text?: string | null
          recommended_contract_type?: string | null
          score_dynamisch?: number | null
          score_variabel?: number | null
          score_vast1?: number | null
          score_vast3?: number | null
          survey_version?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
