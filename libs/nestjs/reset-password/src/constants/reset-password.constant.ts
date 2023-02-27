export const DEFAULT_RESET_PASSWORD_LINK = `/password/reset/{{id}}/{{code}}`;

export const DEFAULT_RESET_PASSWORD_REQUEST_EMAIL_HTML = `<!DOCTYPE html>
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

export const DEFAULT_RESET_PASSWORD_SUCCEED_EMAIL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password updated</title>
</head>
<body>
    <p>Your password has been updated. If you are not the author of this email please contact an administrator.</p>
    <p>-------------------</p>
    <p>Vous avez demandé un nouveau mot de passe. Si vous n'êtes pas à l'origine de cet email, veuillez contacter un administrateur</p>
</body>
</html>`;
