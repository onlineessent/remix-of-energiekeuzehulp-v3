
create table
  public.contract_questions (
    id bigint primary key generated always as identity,
    question_key text not null unique,
    question_text text not null,
    question_explanation text,
    display_order int not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

create table
  public.question_options (
    id bigint primary key generated always as identity,
    question_id bigint references public.contract_questions(id) on delete cascade,
    option_text text not null,
    score_variabel numeric not null,
    score_vast1 numeric not null,
    score_vast3 numeric not null,
    score_dynamisch numeric not null,
    display_order int not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

-- Initial data voor contract questions
insert into public.contract_questions (question_key, question_text, question_explanation, display_order) 
values 
  ('energy_costs', 'Hoe kijk je naar je energiekosten?', 'Bij sommige contracten veranderen je energieprijzen vaker. Dit kan voordelen, maar ook risico''s met zich meebrengen.', 1),
  ('financial_flexibility', 'Hoeveel ruimte heb je om maandelijkse veranderingen in kosten te betalen?', 'Bij sommige contracten kunnen je maandelijkse kosten sterk wisselen. Het is belangrijk om te weten of je hier financieel tegen kunt.', 2),
  ('usage_adjustment', 'Kun je je stroomverbruik aanpassen aan goedkope en dure momenten?', 'Bij een dynamisch contract is stroom op sommige uren goedkoper dan op andere. Als je apparaten kunt gebruiken op momenten dat stroom goedkoop is, kun je geld besparen. Dit hangt af van hoe vaak je thuis bent op deze goedkopere momenten.', 3),
  ('adjustment_willingness', 'Wil je moeite doen om stroom te gebruiken op goedkope momenten?', 'Bij een dynamisch contract is stroom op sommige uren goedkoper dan op andere. Als je apparaten kunt gebruiken op momenten dat stroom goedkoop is, kun je geld besparen. Dit hangt af van hoe vaak je thuis bent op deze goedkopere momenten.', 4),
  ('sustainable_installations', 'Welke (duurzame) installaties heb je in huis of ben je van plan op korte termijn aan te schaffen?', 'Duurzame installaties zoals zonnepanelen en warmtepompen kunnen je helpen om te profiteren van wisselende energieprijzen. Met zonnepanelen wek je bijvoorbeeld overdag stroom op, terwijl de prijzen dan vaak laag zijn. Een thuisbatterij kan je helpen om deze energie op te slaan voor momenten waarop de prijzen hoger zijn.', 5);

2. Nu maken we de `contract_descriptions` tabel voor de verschillende contracttypes:

<lov-write file_path="supabase/migrations/20250428000002_create_contract_descriptions.sql">
create table
  public.contract_descriptions (
    id bigint primary key generated always as identity,
    contract_type text not null unique,
    title text not null,
    short_description text not null,
    detailed_explanation text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

-- Initial data voor contract descriptions
insert into public.contract_descriptions (contract_type, title, short_description, detailed_explanation)
values
  ('variabel', 'Variabel contract', 'Een variabel contract past bij jou omdat je flexibel wilt zijn en kunt omgaan met prijzen die elke drie maanden kunnen veranderen.', 'Bij een variabel contract:\n\n• Worden je energietarieven elke 3 maanden opnieuw vastgesteld\n• Profiteer je automatisch als de energieprijzen dalen\n• Kunnen je maandelijkse kosten stijgen als de energieprijzen omhoog gaan\n• Kun je elke maand wisselen naar een ander soort contract\n\nDit type contract is geschikt voor mensen die flexibel willen zijn en bereid zijn wat meer risico te nemen in ruil voor mogelijke besparingen.'),
  ('vast1', '1 jaar vast contract', 'Een contract voor 1 jaar past bij jou omdat je een goede mix zoekt tussen zekerheid en flexibiliteit.', 'Bij een 1-jarig vast contract:\n\n• Ligt je energietarief voor 1 jaar vast\n• Weet je precies wat je elke maand betaalt\n• Ben je beschermd tegen prijsstijgingen\n• Kun je na 1 jaar wisselen naar een ander soort contract\n\nDit type contract is ideaal als je zekerheid wilt voor je maandlasten, maar wel de vrijheid wilt hebben om na een jaar te kunnen overstappen.'),
  ('vast3', '3 jaar vast contract', 'Een contract voor 3 jaar past bij jou omdat je graag precies wilt weten wat je betaalt.', 'Bij een 3-jarig vast contract:\n\n• Ligt je energietarief voor 3 jaar vast\n• Heb je maximale zekerheid over je energiekosten\n• Ben je langdurig beschermd tegen prijsstijgingen\n• Betaal je meestal iets meer voor deze zekerheid\n\nDit type contract is perfect als je vooral rust wilt en niet wilt nadenken over je energiekosten of veranderende prijzen.'),
  ('dynamisch', 'Dynamisch contract', 'Een dynamisch contract past bij jou omdat je actief met je energieverbruik bezig wilt zijn en kunt profiteren van goedkope momenten.', 'Bij een dynamisch contract:\n\n• Veranderen de stroomprijzen elk uur en de gasprijzen elke dag\n• Kun je flink besparen door slim te plannen\n• Betaal je soms heel weinig (of krijg je zelfs geld)\n• Kun je elke maand wisselen naar een ander soort contract\n\nDit type contract is ideaal als je thuis bent op flexibele tijden en bereid bent je energieverbruik aan te passen aan de goedkope momenten.');

3. Dan maken we de `feedback_questions` tabel:

<lov-write file_path="supabase/migrations/20250428000003_create_feedback_questions.sql">
create table
  public.feedback_questions (
    id bigint primary key generated always as identity,
    question_key text not null unique,
    question_text text not null,
    question_type text not null,
    min_label text,
    max_label text,
    is_optional boolean default false,
    display_order int not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

-- Initial data voor feedback questions
insert into public.feedback_questions (question_key, question_text, question_type, min_label, max_label, is_optional, display_order)
values
  ('expected_outcome', 'Had je zelf verwacht op dit contract uit te komen?', 'yesno', null, null, false, 1),
  ('clarity', 'Hoe duidelijk vind je de uitkomst van de keuzehulp?', 'rating5', 'Zeer onduidelijk', 'Zeer duidelijk', false, 2),
  ('suggestions', 'Heb je suggesties voor verbeteringen of toevoegingen aan de keuzehulp? Zijn er bepaalde functionaliteiten die je zou willen zien?', 'text', null, null, true, 3),
  ('helpfulness', 'In hoeverre helpt de uitkomst je bij het kiezen van een contract?', 'rating5', 'Niet behulpzaam', 'Zeer behulpzaam', false, 4),
  ('recommendation_likelihood', 'Hoe waarschijnlijk is het dat je de keuzehulp aan een vriend of collega zou aanbevelen?', 'rating10_with_text', 'Helemaal niet waarschijnlijk', 'Uiterst waarschijnlijk', false, 5);

4. Ten slotte maken we de `ui_content` tabel voor algemene UI elementen:

<lov-write file_path="supabase/migrations/20250428000004_create_ui_content.sql">
create table
  public.ui_content (
    id bigint primary key generated always as identity,
    content_key text not null unique,
    content_text text not null,
    category text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

-- Initial data voor UI content
insert into public.ui_content (content_key, content_text, category)
values
  ('next_button', 'Volgende vraag', 'navigation'),
  ('back_button', 'Vorige vraag', 'navigation'),
  ('reset_button', 'Begin opnieuw', 'navigation'),
  ('submit_button', 'Verstuur', 'navigation'),
  ('results_heading', 'Je aanbevolen energiecontract', 'results'),
  ('results_description', 'Op basis van jouw antwoorden hebben we het meest geschikte energiecontract voor je geselecteerd.', 'results'),
  ('social_proof_satisfaction', '89% tevredenheid', 'social_proof'),
  ('social_proof_users', 'Gekozen door 450+ gebruikers', 'social_proof'),
  ('strengths_heading', 'Waarom past dit bij mij?', 'results'),
  ('alternatives_heading', 'Andere contracttypes (gesorteerd op match):', 'results'),
  ('explanation_button', 'Uitleg', 'dialog'),
  ('dialog_title', 'Waarom is dit belangrijk?', 'dialog'),
  ('feedback_optional', '(optioneel)', 'feedback'),
  ('feedback_textarea_placeholder', 'Type hier je toelichting...', 'feedback'),
  ('feedback_suggestion_placeholder', 'Type hier je suggesties...', 'feedback'),
  ('feedback_header_title', 'Uw feedback over de aanbeveling', 'feedback'),
  ('feedback_header_description', 'Hieronder volgen enkele vragen over het energiecontract dat we voor u hebben aanbevolen en direct daaronder wordt getoond.', 'feedback'),
  ('feedback_thankyou_title', 'Bedankt voor je feedback!', 'feedback'),
  ('feedback_thankyou_description', 'Je antwoorden helpen ons om deze keuzehulp te verbeteren.', 'feedback'),
  ('feedback_close_button', 'Afsluiten', 'feedback');

-- Add triggers for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger set_contract_questions_updated_at
  before update on public.contract_questions
  for each row
  execute function public.set_updated_at();

create trigger set_question_options_updated_at
  before update on public.question_options
  for each row
  execute function public.set_updated_at();

create trigger set_contract_descriptions_updated_at
  before update on public.contract_descriptions
  for each row
  execute function public.set_updated_at();

create trigger set_feedback_questions_updated_at
  before update on public.feedback_questions
  for each row
  execute function public.set_updated_at();

create trigger set_ui_content_updated_at
  before update on public.ui_content
  for each row
  execute function public.set_updated_at();
