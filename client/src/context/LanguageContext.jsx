import {
    createContext,
    useContext,
    useState
} from "react";

const LanguageContext = createContext();

const translations = {

    // =====================================================
    // ENGLISH
    // =====================================================

    English: {

        languageName: "English",

        // =====================================================
        // NAVBAR
        // =====================================================

        home: "Home",
        login: "Login",
        signup: "Get Started",
        dashboard: "Dashboard",
        myRecipes: "My Recipes",
        profile: "Profile",
        logout: "Logout",

        // =====================================================
        // AUTH - LOGIN / SIGNUP
        // =====================================================

        welcomeBack: "Welcome back",

        name: "Name",

        email: "Email",

        password: "Password",

        dontHaveAccount:
            "Don't have an account?",

        alreadyHaveAccount:
            "Already have an account?",

        createAccount:
            "Create Account",

        registrationFailed:
            "Registration failed",

        loginFailed:
            "Login failed",

        // =====================================================
        // DASHBOARD
        // =====================================================

        hello: "Hello",

        createRecipe:
            "Create a Recipe",

        myRecipeCollection:
            "Your saved AI-generated recipes",

        turnIngredientsIntoRecipes:
            "Turn Your Ingredients Into Delicious Recipes",

        whatWouldYouLikeToDo:
            "What would you like to do?",

        getStarted:
            "Get Started",

        viewRecipes:
            "View Recipes",

        exploreAI:
            "Explore AI",

        pleaseWait:
            "Please wait...",

        // =====================================================
        // UPLOAD / RECIPE GENERATION
        // =====================================================

        uploadIngredients:
            "Upload Ingredient Image",

        findIngredients:
            "Find Ingredients",

        uploadIngredientsDescription:
            "Take a photo of the ingredients you already have in your kitchen.",

        chooseImage:
            "Choose Image",

        analyzeImage:
            "Analyze Image",

        analyzing:
            "Analyzing...",

        yourIngredients:
            "Your Ingredients",

        selectedIngredients:
            "Selected Ingredients",

        reviewIngredients:
            "Review the detected ingredients. You can remove or add items before generating a recipe.",

        addIngredient:
            "Add an ingredient...",

        add:
            "Add",

        remove:
            "Remove",

        pleaseSelectImage:
            "Please select an image first.",

        loginAgain:
            "Please login again.",

        ingredientsDetected:
            "Ingredients detected successfully.",

        ingredientDetectionFailed:
            "Failed to detect ingredients.",

        ingredientAlreadyExists:
            "This ingredient already exists.",

        addAtLeastOneIngredient:
            "Please add at least one ingredient.",

        recipeLanguage:
            "Recipe Language",

        chooseRecipeLanguage:
            "Choose the language for your recipe",

        generateRecipe:
            "Generate Recipe",

        generatingRecipe:
            "Generating Recipe...",

        recipeGenerated:
            "Recipe generated successfully.",

        recipeGenerationFailed:
            "Failed to generate recipe.",

        saveRecipe:
            "Save Recipe",

        saving:
            "Saving...",

        recipeSaved:
            "Recipe saved successfully.",

        recipeSaveFailed:
            "Failed to save recipe.",

        ingredients:
            "Ingredients",

        instructions:
            "Instructions",

        cookingTime:
            "Cooking Time",

        servings:
            "Servings",

        // =====================================================
        // MY RECIPES
        // =====================================================

        savedRecipe:
            "SAVED RECIPE",

        cookingInstructions:
            "Cooking Instructions",

        backToMyRecipes:
            "Back to My Recipes",

        viewFullRecipe:
            "View Full Recipe",

        deleteRecipe:
            "Delete Recipe",

        searchRecipes:
            "Search recipes...",

        noSavedRecipes:
            "No saved recipes yet",

        createFirstRecipe:
            "Create your first recipe by uploading an ingredient image.",

        createFirst:
            "Create Your First Recipe",

        noRecipesFound:
            "No recipes found",

        tryDifferentSearch:
            "Try searching for a different recipe name.",

        // =====================================================
        // PROFILE
        // =====================================================

        editProfile:
            "Edit Profile",

        saveChanges:
            "Save Changes",

        cancel:
            "Cancel",

        accountInformation:
            "Account Information",

        loading:
            "Loading...",

        // =====================================================
        // RECIPE DETAILS
        // =====================================================

        recipeNotFound:
            "Recipe Not Found",

        noIngredients:
            "No ingredients available.",

        noInstructions:
            "No instructions available.",

        translateRecipe:
            "Translate Recipe",

        // =====================================================
        // HOME
        // =====================================================

        aiPowered:
            "AI-Powered Recipe Generator",

        turnIngredients:
            "Turn Your Ingredients",

        deliciousRecipes:
            "Into Delicious Recipes",

        heroDescription:
            "Have ingredients but don't know what to cook? Upload a photo of your ingredients and let RasoiMate's AI create a delicious recipe for you.",

        createYourRecipe:
            "Create Your Recipe",

        howItWorks:
            "How It Works",

        noRecipeSearching:
            "No recipe searching",

        aiIngredientDetection:
            "AI ingredient detection",

        personalizedRecipes:
            "Personalized recipes",

        aiGenerated:
            "AI GENERATED",

        freshVegetableOmelette:
            "Fresh Vegetable Omelette",

        recipePreviewDescription:
            "A delicious recipe created from your available ingredients.",

        simpleAndSmart:
            "SIMPLE & SMART",

        howRasoiMateWorks:
            "How RasoiMate Works",

        howItWorksDescription:
            "From ingredients to a delicious meal in just a few simple steps.",

        upload:
            "Upload",

        detect:
            "Detect",

        generate:
            "Generate",

        uploadStep:
            "Upload a photo of the ingredients you already have.",

        detectStep:
            "AI identifies the ingredients in your image.",

        generateStep:
            "RasoiMate creates a personalized recipe.",

        aiDetectsIngredients:
            "AI Detects Ingredients",

        aiDetectsDescription:
            "Our AI analyzes your image and identifies the visible ingredients.",

        getYourRecipe:
            "Get Your Recipe",

        getYourRecipeDescription:
            "RasoiMate generates a personalized recipe using your ingredients.",

        whyRasoiMate:
            "WHY RASOIMATE",

        smartKitchen:
            "Your Smart Kitchen Companion",

        smartIngredientDetection:
            "Smart Ingredient Detection",

        smartIngredientDescription:
            "Upload an image and let AI identify the ingredients visible in your kitchen.",

        aiRecipeGeneration:
            "AI Recipe Generation",

        aiRecipeDescription:
            "Get creative recipes generated specifically from your available ingredients.",

        saveYourRecipes:
            "Save Your Recipes",

        saveRecipesDescription:
            "Save your favorite AI-generated recipes and access them anytime.",

        editIngredients:
            "Edit Ingredients",

        editIngredientsDescription:
            "Review and modify detected ingredients before generating your recipe.",

        readyToCook:
            "Ready to Cook Something Delicious?",

        readyToCookDescription:
            "Turn the ingredients in your kitchen into your next favorite meal.",

        startCooking:
            "Start Cooking with AI",

        smartCookingPowered:
            "Smart cooking powered by AI.",

        allRightsReserved:
            "All rights reserved.",

        recipeSearch:
            "Search recipes..."
    },


    // =====================================================
    // HINDI
    // =====================================================

    Hindi: {

        languageName: "हिन्दी",

        // =====================================================
        // NAVBAR
        // =====================================================

        home: "होम",
        login: "लॉग इन",
        signup: "शुरू करें",
        dashboard: "डैशबोर्ड",
        myRecipes: "मेरी रेसिपी",
        profile: "प्रोफ़ाइल",
        logout: "लॉग आउट",

        // =====================================================
        // AUTH
        // =====================================================

        welcomeBack:
            "वापसी पर स्वागत है",

        name:
            "नाम",

        email:
            "ईमेल",

        password:
            "पासवर्ड",

        dontHaveAccount:
            "क्या आपका अकाउंट नहीं है?",

        alreadyHaveAccount:
            "क्या आपका पहले से अकाउंट है?",

        createAccount:
            "अकाउंट बनाएं",

        registrationFailed:
            "पंजीकरण विफल हुआ",

        loginFailed:
            "लॉगिन विफल हुआ",

        // =====================================================
        // DASHBOARD
        // =====================================================

        hello:
            "नमस्ते",

        createRecipe:
            "रेसिपी बनाएं",

        myRecipeCollection:
            "आपकी सेव की गई AI रेसिपी",

        turnIngredientsIntoRecipes:
            "अपनी सामग्री से स्वादिष्ट रेसिपी बनाएं",

        whatWouldYouLikeToDo:
            "आप क्या करना चाहते हैं?",

        getStarted:
            "शुरू करें",

        viewRecipes:
            "रेसिपी देखें",

        exploreAI:
            "AI देखें",

        pleaseWait:
            "कृपया प्रतीक्षा करें...",

        // =====================================================
        // UPLOAD / RECIPE GENERATION
        // =====================================================

        uploadIngredients:
            "सामग्री की तस्वीर अपलोड करें",

        findIngredients:
            "सामग्री खोजें",

        uploadIngredientsDescription:
            "अपने किचन में मौजूद सामग्री की तस्वीर लें।",

        chooseImage:
            "तस्वीर चुनें",

        analyzeImage:
            "तस्वीर का विश्लेषण करें",

        analyzing:
            "विश्लेषण हो रहा है...",

        yourIngredients:
            "आपकी सामग्री",

        selectedIngredients:
            "चयनित सामग्री",

        reviewIngredients:
            "पहचानी गई सामग्री की समीक्षा करें। आप सामग्री हटा या जोड़ सकते हैं।",

        addIngredient:
            "सामग्री जोड़ें...",

        add:
            "जोड़ें",

        remove:
            "हटाएं",

        pleaseSelectImage:
            "कृपया पहले एक तस्वीर चुनें।",

        loginAgain:
            "कृपया फिर से लॉगिन करें।",

        ingredientsDetected:
            "सामग्री सफलतापूर्वक पहचानी गई।",

        ingredientDetectionFailed:
            "सामग्री पहचानने में विफल।",

        ingredientAlreadyExists:
            "यह सामग्री पहले से मौजूद है।",

        addAtLeastOneIngredient:
            "कृपया कम से कम एक सामग्री जोड़ें।",

        recipeLanguage:
            "रेसिपी की भाषा",

        chooseRecipeLanguage:
            "अपनी रेसिपी की भाषा चुनें",

        generateRecipe:
            "रेसिपी बनाएं",

        generatingRecipe:
            "रेसिपी बनाई जा रही है...",

        recipeGenerated:
            "रेसिपी सफलतापूर्वक बनाई गई।",

        recipeGenerationFailed:
            "रेसिपी बनाने में विफल।",

        saveRecipe:
            "रेसिपी सेव करें",

        saving:
            "सेव हो रहा है...",

        recipeSaved:
            "रेसिपी सफलतापूर्वक सेव की गई।",

        recipeSaveFailed:
            "रेसिपी सेव करने में विफल।",

        ingredients:
            "सामग्री",

        instructions:
            "विधि",

        cookingTime:
            "पकाने का समय",

        servings:
            "सर्विंग्स",

        // =====================================================
        // MY RECIPES
        // =====================================================

        savedRecipe:
            "सेव की गई रेसिपी",

        cookingInstructions:
            "बनाने की विधि",

        backToMyRecipes:
            "मेरी रेसिपी पर वापस जाएं",

        viewFullRecipe:
            "पूरी रेसिपी देखें",

        deleteRecipe:
            "रेसिपी हटाएं",

        searchRecipes:
            "रेसिपी खोजें...",

        noSavedRecipes:
            "अभी कोई सेव की गई रेसिपी नहीं है",

        createFirstRecipe:
            "सामग्री की तस्वीर अपलोड करके अपनी पहली रेसिपी बनाएं।",

        createFirst:
            "अपनी पहली रेसिपी बनाएं",

        noRecipesFound:
            "कोई रेसिपी नहीं मिली",

        tryDifferentSearch:
            "किसी दूसरी रेसिपी का नाम खोजें।",

        // =====================================================
        // PROFILE
        // =====================================================

        editProfile:
            "प्रोफ़ाइल संपादित करें",

        saveChanges:
            "बदलाव सेव करें",

        cancel:
            "रद्द करें",

        accountInformation:
            "अकाउंट की जानकारी",

        loading:
            "लोड हो रहा है...",

        // =====================================================
        // RECIPE DETAILS
        // =====================================================

        recipeNotFound:
            "रेसिपी नहीं मिली",

        noIngredients:
            "कोई सामग्री उपलब्ध नहीं है।",

        noInstructions:
            "कोई विधि उपलब्ध नहीं है।",

        translateRecipe:
            "रेसिपी का अनुवाद करें",

        // =====================================================
        // HOME
        // =====================================================

        aiPowered:
            "AI आधारित रेसिपी जनरेटर",

        turnIngredients:
            "अपनी सामग्री को",

        deliciousRecipes:
            "स्वादिष्ट रेसिपी में बदलें",

        heroDescription:
            "सामग्री है लेकिन समझ नहीं आ रहा कि क्या बनाएं? अपनी सामग्री की तस्वीर अपलोड करें और RasoiMate का AI आपके लिए स्वादिष्ट रेसिपी बनाएगा।",

        createYourRecipe:
            "अपनी रेसिपी बनाएं",

        howItWorks:
            "यह कैसे काम करता है",

        noRecipeSearching:
            "रेसिपी खोजने की जरूरत नहीं",

        aiIngredientDetection:
            "AI सामग्री पहचान",

        personalizedRecipes:
            "व्यक्तिगत रेसिपी",

        aiGenerated:
            "AI द्वारा बनाई गई",

        freshVegetableOmelette:
            "फ्रेश वेजिटेबल ऑमलेट",

        recipePreviewDescription:
            "आपकी उपलब्ध सामग्री से बनाई गई स्वादिष्ट रेसिपी।",

        simpleAndSmart:
            "सरल और स्मार्ट",

        howRasoiMateWorks:
            "RasoiMate कैसे काम करता है",

        howItWorksDescription:
            "सामग्री से स्वादिष्ट भोजन तक, कुछ आसान चरणों में।",

        upload:
            "अपलोड करें",

        detect:
            "पहचानें",

        generate:
            "बनाएं",

        uploadStep:
            "आपके पास मौजूद सामग्री की तस्वीर अपलोड करें।",

        detectStep:
            "AI आपकी तस्वीर में मौजूद सामग्री को पहचानता है।",

        generateStep:
            "RasoiMate आपके लिए एक व्यक्तिगत रेसिपी बनाता है।",

        aiDetectsIngredients:
            "AI सामग्री पहचानता है",

        aiDetectsDescription:
            "हमारा AI आपकी तस्वीर का विश्लेषण करके दिखाई देने वाली सामग्री पहचानता है।",

        getYourRecipe:
            "अपनी रेसिपी पाएं",

        getYourRecipeDescription:
            "RasoiMate आपकी सामग्री का उपयोग करके एक व्यक्तिगत रेसिपी बनाता है।",

        whyRasoiMate:
            "RASOIMATE क्यों",

        smartKitchen:
            "आपका स्मार्ट किचन साथी",

        smartIngredientDetection:
            "स्मार्ट सामग्री पहचान",

        smartIngredientDescription:
            "एक तस्वीर अपलोड करें और AI को आपकी सामग्री पहचानने दें।",

        aiRecipeGeneration:
            "AI रेसिपी जनरेशन",

        aiRecipeDescription:
            "आपकी उपलब्ध सामग्री से विशेष रूप से बनाई गई रचनात्मक रेसिपी पाएं।",

        saveYourRecipes:
            "अपनी रेसिपी सेव करें",

        saveRecipesDescription:
            "अपनी पसंदीदा AI रेसिपी सेव करें और उन्हें कभी भी देखें।",

        editIngredients:
            "सामग्री संपादित करें",

        editIngredientsDescription:
            "रेसिपी बनाने से पहले पहचानी गई सामग्री की समीक्षा और बदलाव करें।",

        readyToCook:
            "कुछ स्वादिष्ट बनाने के लिए तैयार हैं?",

        readyToCookDescription:
            "अपने किचन की सामग्री को अपनी अगली पसंदीदा रेसिपी में बदलें।",

        startCooking:
            "AI के साथ खाना बनाना शुरू करें",

        smartCookingPowered:
            "AI द्वारा संचालित स्मार्ट कुकिंग।",

        allRightsReserved:
            "सर्वाधिकार सुरक्षित।",

        recipeSearch:
            "रेसिपी खोजें..."
    },


    // =====================================================
    // MARATHI
    // =====================================================

    Marathi: {

        languageName: "मराठी",

        // =====================================================
        // NAVBAR
        // =====================================================

        home: "होम",
        login: "लॉग इन",
        signup: "सुरुवात करा",
        dashboard: "डॅशबोर्ड",
        myRecipes: "माझ्या पाककृती",
        profile: "प्रोफाइल",
        logout: "लॉग आउट",

        // =====================================================
        // AUTH
        // =====================================================

        welcomeBack:
            "पुन्हा स्वागत आहे",

        name:
            "नाव",

        email:
            "ईमेल",

        password:
            "पासवर्ड",

        dontHaveAccount:
            "तुमचे अकाउंट नाही का?",

        alreadyHaveAccount:
            "तुमचे आधीपासून अकाउंट आहे का?",

        createAccount:
            "अकाउंट तयार करा",

        registrationFailed:
            "नोंदणी अयशस्वी झाली",

        loginFailed:
            "लॉगिन अयशस्वी झाले",

        // =====================================================
        // DASHBOARD
        // =====================================================

        hello:
            "नमस्कार",

        createRecipe:
            "पाककृती तयार करा",

        myRecipeCollection:
            "तुमच्या सेव्ह केलेल्या AI पाककृती",

        turnIngredientsIntoRecipes:
            "तुमच्या साहित्यापासून स्वादिष्ट पाककृती तयार करा",

        whatWouldYouLikeToDo:
            "तुम्हाला काय करायचे आहे?",

        getStarted:
            "सुरुवात करा",

        viewRecipes:
            "पाककृती पहा",

        exploreAI:
            "AI एक्सप्लोर करा",

        pleaseWait:
            "कृपया प्रतीक्षा करा...",

        // =====================================================
        // UPLOAD / RECIPE GENERATION
        // =====================================================

        uploadIngredients:
            "साहित्याचा फोटो अपलोड करा",

        findIngredients:
            "साहित्य शोधा",

        uploadIngredientsDescription:
            "तुमच्या किचनमध्ये उपलब्ध असलेल्या साहित्याचा फोटो घ्या.",

        chooseImage:
            "फोटो निवडा",

        analyzeImage:
            "फोटोचे विश्लेषण करा",

        analyzing:
            "विश्लेषण सुरू आहे...",

        yourIngredients:
            "तुमचे साहित्य",

        selectedIngredients:
            "निवडलेले साहित्य",

        reviewIngredients:
            "ओळखलेले साहित्य तपासा. तुम्ही साहित्य काढू किंवा नवीन साहित्य जोडू शकता.",

        addIngredient:
            "साहित्य जोडा...",

        add:
            "जोडा",

        remove:
            "काढा",

        pleaseSelectImage:
            "कृपया प्रथम एक फोटो निवडा.",

        loginAgain:
            "कृपया पुन्हा लॉगिन करा.",

        ingredientsDetected:
            "साहित्य यशस्वीरित्या ओळखले गेले.",

        ingredientDetectionFailed:
            "साहित्य ओळखण्यात अयशस्वी.",

        ingredientAlreadyExists:
            "हे साहित्य आधीपासून उपलब्ध आहे.",

        addAtLeastOneIngredient:
            "कृपया किमान एक साहित्य जोडा.",

        recipeLanguage:
            "पाककृतीची भाषा",

        chooseRecipeLanguage:
            "तुमच्या पाककृतीची भाषा निवडा",

        generateRecipe:
            "पाककृती तयार करा",

        generatingRecipe:
            "पाककृती तयार होत आहे...",

        recipeGenerated:
            "पाककृती यशस्वीरित्या तयार झाली.",

        recipeGenerationFailed:
            "पाककृती तयार करण्यात अयशस्वी.",

        saveRecipe:
            "पाककृती सेव्ह करा",

        saving:
            "सेव्ह होत आहे...",

        recipeSaved:
            "पाककृती यशस्वीरित्या सेव्ह झाली.",

        recipeSaveFailed:
            "पाककृती सेव्ह करण्यात अयशस्वी.",

        ingredients:
            "साहित्य",

        instructions:
            "कृती",

        cookingTime:
            "पाककला वेळ",

        servings:
            "सर्व्हिंग्स",

        // =====================================================
        // MY RECIPES
        // =====================================================

        savedRecipe:
            "सेव्ह केलेली पाककृती",

        cookingInstructions:
            "पाककृतीची कृती",

        backToMyRecipes:
            "माझ्या पाककृतींकडे परत जा",

        viewFullRecipe:
            "पूर्ण पाककृती पहा",

        deleteRecipe:
            "पाककृती हटवा",

        searchRecipes:
            "पाककृती शोधा...",

        noSavedRecipes:
            "अजून कोणतीही पाककृती सेव्ह केलेली नाही",

        createFirstRecipe:
            "साहित्याचा फोटो अपलोड करून तुमची पहिली पाककृती तयार करा.",

        createFirst:
            "तुमची पहिली पाककृती तयार करा",

        noRecipesFound:
            "कोणतीही पाककृती सापडली नाही",

        tryDifferentSearch:
            "वेगळ्या पाककृतीचे नाव शोधा.",

        // =====================================================
        // PROFILE
        // =====================================================

        editProfile:
            "प्रोफाइल संपादित करा",

        saveChanges:
            "बदल सेव्ह करा",

        cancel:
            "रद्द करा",

        accountInformation:
            "अकाउंटची माहिती",

        loading:
            "लोड होत आहे...",

        // =====================================================
        // RECIPE DETAILS
        // =====================================================

        recipeNotFound:
            "पाककृती सापडली नाही",

        noIngredients:
            "साहित्य उपलब्ध नाही.",

        noInstructions:
            "कृती उपलब्ध नाही.",

        translateRecipe:
            "पाककृतीचे भाषांतर करा",

        // =====================================================
        // HOME
        // =====================================================

        aiPowered:
            "AI आधारित पाककृती जनरेटर",

        turnIngredients:
            "तुमच्या साहित्याचे",

        deliciousRecipes:
            "स्वादिष्ट पाककृतीत रूपांतर करा",

        heroDescription:
            "साहित्य आहे पण काय बनवायचे हे समजत नाही? तुमच्या साहित्याचा फोटो अपलोड करा आणि RasoiMate चे AI तुमच्यासाठी स्वादिष्ट पाककृती तयार करेल.",

        createYourRecipe:
            "तुमची पाककृती तयार करा",

        howItWorks:
            "हे कसे काम करते",

        noRecipeSearching:
            "पाककृती शोधण्याची गरज नाही",

        aiIngredientDetection:
            "AI साहित्य ओळख",

        personalizedRecipes:
            "वैयक्तिक पाककृती",

        aiGenerated:
            "AI द्वारे तयार",

        freshVegetableOmelette:
            "फ्रेश व्हेजिटेबल ऑम्लेट",

        recipePreviewDescription:
            "तुमच्या उपलब्ध साहित्यापासून तयार केलेली स्वादिष्ट पाककृती.",

        simpleAndSmart:
            "सोपे आणि स्मार्ट",

        howRasoiMateWorks:
            "RasoiMate कसे काम करते",

        howItWorksDescription:
            "साहित्यापासून स्वादिष्ट जेवणापर्यंत, काही सोप्या चरणांमध्ये.",

        upload:
            "अपलोड करा",

        detect:
            "ओळखा",

        generate:
            "तयार करा",

        uploadStep:
            "तुमच्याकडे असलेल्या साहित्याचा फोटो अपलोड करा.",

        detectStep:
            "AI तुमच्या फोटोमधील साहित्य ओळखतो.",

        generateStep:
            "RasoiMate तुमच्यासाठी वैयक्तिक पाककृती तयार करते.",

        aiDetectsIngredients:
            "AI साहित्य ओळखते",

        aiDetectsDescription:
            "आमचे AI तुमच्या फोटोचे विश्लेषण करून दिसणारे साहित्य ओळखते.",

        getYourRecipe:
            "तुमची पाककृती मिळवा",

        getYourRecipeDescription:
            "RasoiMate तुमच्या साहित्याचा वापर करून वैयक्तिक पाककृती तयार करते.",

        whyRasoiMate:
            "RASOIMATE का",

        smartKitchen:
            "तुमचा स्मार्ट किचन साथीदार",

        smartIngredientDetection:
            "स्मार्ट साहित्य ओळख",

        smartIngredientDescription:
            "फोटो अपलोड करा आणि AI ला तुमच्या साहित्याची ओळख करू द्या.",

        aiRecipeGeneration:
            "AI पाककृती निर्मिती",

        aiRecipeDescription:
            "तुमच्या उपलब्ध साहित्यापासून खास तयार केलेल्या रचनात्मक पाककृती मिळवा.",

        saveYourRecipes:
            "तुमच्या पाककृती सेव्ह करा",

        saveRecipesDescription:
            "तुमच्या आवडत्या AI पाककृती सेव्ह करा आणि त्या कधीही पाहा.",

        editIngredients:
            "साहित्य संपादित करा",

        editIngredientsDescription:
            "पाककृती तयार करण्यापूर्वी ओळखलेल्या साहित्याचे पुनरावलोकन आणि बदल करा.",

        readyToCook:
            "काही स्वादिष्ट बनवण्यासाठी तयार आहात?",

        readyToCookDescription:
            "तुमच्या किचनमधील साहित्याचे तुमच्या पुढील आवडत्या पाककृतीत रूपांतर करा.",

        startCooking:
            "AI सोबत स्वयंपाक सुरू करा",

        smartCookingPowered:
            "AI द्वारे समर्थित स्मार्ट कुकिंग.",

        allRightsReserved:
            "सर्व हक्क राखीव.",

        recipeSearch:
            "पाककृती शोधा..."
    }
};


// =====================================================
// LANGUAGE PROVIDER
// =====================================================

export function LanguageProvider({ children }) {

    const [language, setLanguage] = useState(
        localStorage.getItem("language") ||
        "English"
    );

    const changeLanguage = (newLanguage) => {

        setLanguage(newLanguage);

        localStorage.setItem(
            "language",
            newLanguage
        );
    };

    const t = (key) => {

        return (
            translations[language]?.[key] ||
            translations.English?.[key] ||
            key
        );
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage: changeLanguage,
                t
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}


// =====================================================
// CUSTOM HOOK
// =====================================================

export function useLanguage() {

    return useContext(
        LanguageContext
    );
}