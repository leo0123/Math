module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "globals": {
        "React": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        /*"indent": [
            "error",
            "tab"
        ],*/
        /*"linebreak-style": [
            "error",
            "unix"
        ],*/
        /*"quotes": [
            "error",
            "double"
        ],*/
        "semi": [
            "error",
            "always"
        ],
        //"react/jsx-uses-react": "error",
        //"react/jsx-uses-vars": "error",
        "no-console": "off",
        "react/prop-types": "off"
    }
};
