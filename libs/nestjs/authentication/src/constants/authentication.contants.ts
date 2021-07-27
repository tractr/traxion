export const AUTHENTICATION_MODULE_OPTIONS = ' AUTHENTICATION_MODULE_OPTIONS';

export const DEFAULT_RESET_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password reset</title>
</head>
<body>
    <p>You have requested a new password.</p>
    <p>Please follow this link to <a href="[[var:link]]">reset your password</a>.</p>
    <p>This link has a validity of [[var:expiresIn]] minutes.</p>
    <p>-------------------</p>
    <p>Vous avez demandé un nouveau mot de passe.</p>
    <p>Veuillez cliquer sur ce lien pour <a href="[[var:link]]">modifier votre mot de passe</a>.</p>
    <p>Ce lien a une validité de [[var:expiresIn]] minutes.</p>
</body>
</html>`;
