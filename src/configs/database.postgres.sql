create schema MONITOR_HOM

CREATE TABLE IF NOT EXISTS MONITOR_HOM.INFO (system text, name text, request text, response text, status text, error text)
CREATE TABLE IF NOT EXISTS MONITOR_HOM.SYSTEM (ID text, name text, request_url text, url text, maintance boolean, homologation boolean)
CREATE TABLE IF NOT EXISTS MONITOR_HOM.EMAIL (id integer, sender text, email text, host text,  senha text, port integer , destinations text)


insert into MONITOR_HOM.SYSTEM values
(
	'organize-homologacao',
	'Organize Homologacao',
	'http://homologacao.sistemas.com.br/organize/public/api/configuracao/operadora/info',
	'http://homologacao.sistemas.com.br/organize',
	false,
	true);
	
	insert into MONITOR_HOM.SYSTEM values
(
	'organize',
	'Organize',
	'http://organize.sistemas.com.br/organize/public/api/configuracao/operadora/info',
	'http://organize.sistemas.com.br/organize',
	false,
	false);
			
	insert into MONITOR_HOM.SYSTEM values
(
	'zeus-homologacao',
	'Zeus Homologacao',
	'http://homologacao.sistemas.com.br/zeus/public/api/tipo-periodicidade',
	'http://homologacao.sistemas.com.br/zeus',
	false,
	true);
		
	insert into MONITOR_HOM.SYSTEM values
(
	'zeus',
	'Zeus',
	'http://zeus.sistemas.com.br/zeus/public/api/tipo-periodicidade',
	'http://zeus.sistemas.com.br/zeus',
	false,
	false);
	
			
	insert into MONITOR_HOM.SYSTEM values
(
	'app./viver-bem',
	'Viver Bem - Produção(Araruama)',
	'http://app.sistemas.com.br/viver-bem/public/api/sexo',
	'http://app.sistemas.com.br/viver-bem',
	false,
	false);
				
	insert into MONITOR_HOM.SYSTEM values
(
	'app./viver-bem-hom',
	'Viver Bem  - Homologacao(Araruama)',
	'http://app.sistemas.com.br/viver-bem-hom/public/api/sexo',
	'http://app.sistemas.com.br/viver-bem',
	false,
	true);
	
					
	insert into MONITOR_HOM.SYSTEM values
(
	'app./apolo',
	'Apolo  - Produção(Lifecare)',
	'http://app.sistemas.com.br/apolo/public/api/sexo',
	'http://app.sistemas.com.br/apolo',
	false,
	false);
	
		
					
	insert into MONITOR_HOM.SYSTEM values
(
	'simplifi./simplifi',
	'SimpliFi',
	'http://simplifi.sistemas.com.br/apolo/public/api/sexo',
	'http://simplifi.sistemas.com.br/apolo',
	false,
	false)	;
					
	insert into MONITOR_HOM.SYSTEM values
(
	'simplifi./apolo',
	'Apolo - Homologação(Lifecare)',
	'http://simplifi.sistemas.com.br/financas/public/version',
	'http://simplifi.sistemas.com.br/financas',
	false,
	true)	;
					
	insert into MONITOR_HOM.SYSTEM values
(
	'simplifi./alpheuz',
	'Alpheuz',
	'http://simplifi.sistemas.com.br/alpheuz/public/version',
	'http://simplifi.sistemas.com.br/alpheuz',
	false,
	false)	;
					
-- 	insert into MONITOR_HOM.SYSTEM values
-- (
-- 	'',
-- 	'',
-- 	'',
-- 	'',
-- 	false,
-- 	false)