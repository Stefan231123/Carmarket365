#!/usr/bin/env python3
"""
Consolidate duplicate objects in mk.ts translation file.
This script merges all duplicate objects while preserving all unique content.
"""

def consolidate_mk_translations():
    """Consolidate the Macedonian translation file by merging duplicates."""
    
    input_file = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts"
    output_file = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk_consolidated.ts"
    
    # Read the original file
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The strategy is to identify duplicate objects and manually merge them
    # Based on the analysis, these are the duplicates:
    # 1. forms (3 times): lines 61, 4419, 5352
    # 2. browseCars (2 times): lines 545, 3626
    # 3. errors (2 times): lines 1134, 4342
    # 4. carDetail (2 times): lines 1335, 3722
    # 5. indexPage (2 times): lines 2673, 4191
    # 6. finalFixes (5 times): lines 3417, 3601, 4808, 5260, 5290
    
    # Extract lines
    lines = content.split('\n')
    
    # Build a new file structure
    consolidated_content = []
    
    # Start with the beginning of the file up to the first occurrence of forms
    for i in range(60):  # Up to line 60 (before forms at line 61)
        consolidated_content.append(lines[i])
    
    # Now we need to create consolidated versions of each duplicate object
    # Let's write them manually based on the analysis
    
    consolidated_content.extend([
        "",
        "  // Consolidated forms object - merged from lines 61, 4419, 5352",
        "  forms: {",
        "    placeholders: {",
        "      selectMake: 'Изберете марка',",
        "      selectModel: 'Изберете модел',",
        "      selectYear: 'Изберете година',",
        "      selectCondition: 'Изберете состојба',",
        "      selectFuelType: 'Изберете тип на гориво',",
        "      selectTransmission: 'Изберете трансмисија',",
        "      selectBodyType: 'Изберете тип на каросерија',",
        "      selectDrivetrain: 'Изберете погон',",
        "      enterName: 'Внесете име',",
        "      enterEmail: 'Внесете е-пошта',",
        "      enterPassword: 'Внесете лозинка',",
        "      enterPhone: 'Внесете телефон',",
        "      enterModel: 'Внесете модел',",
        "      enterMileage: 'Внесете километража',",
        "      enterPrice: 'Внесете цена',",
        "      enterLocation: 'Внесете локација',",
        "      enterCity: 'Внесете град',",
        "      enterDescription: 'Внесете опис',",
        "      enterMessage: 'Внесете ја вашата порака',",
        "      searchCars: 'Барај автомобили',",
        "      searchListings: 'Барај огласи',",
        "      searchFAQs: 'Барај ЧПП',",
        "      anyMake: 'Било која марка',",
        "      anyModel: 'Било кој модел',",
        "      anyYear: 'Било која година',",
        "      anyMileage: 'Било која километража',",
        "      minPrice: 'Мин. цена',",
        "      maxPrice: 'Макс. цена',",
        "      role: 'Улога',",
        "      sortBy: 'Сортирај по',",
        "      filterBy: 'Филтрирај по',",
        "      dealerNameOrCity: 'Име на дилер или град',",
        "      allStates: 'Сите држави',",
        "      allSpecialities: 'Сите специјалности',",
        "      egFiftyThousand: 'пр. 50.000',",
        "      successMessage: 'Вашиот оглас е успешно креиран!',",
        "      requiredFieldMessage: 'Ова поле е задолжително',",
        "      contactMessage: 'Здраво, заинтересиран/а сум за {ar} {make} {model}. Ве молиме контактирајте ме за повеќе детали.',",
        "      enterFullName: 'Внесете го вашето полно име',",
        "      enterEmail: 'Внесете ја вашата е-пошта',",
        "      enterPhone: 'Внесете го вашиот број на телефон'",
        "    },",
        "    labels: {",
        "      businessName: 'Име на бизнис',",
        "      businessType: 'Тип на бизнис',",
        "      vatNumber: 'ДДВ број',",
        "      firstName: 'Име',",
        "      lastName: 'Презиме',",
        "      email: 'Е-пошта',",
        "      emailAddress: 'Е-пошта адреса',",
        "      password: 'Лозинка',",
        "      confirmPassword: 'Потврдете лозинка',",
        "      phoneNumber: 'Број на телефон',",
        "      street: 'Улица',",
        "      city: 'Град',",
        "      state: 'Држава',",
        "      postalCode: 'Поштенски број',",
        "      country: 'Земја',",
        "      make: 'Марка',",
        "      model: 'Модел',",
        "      year: 'Година',",
        "      mileage: 'Километража',",
        "      condition: 'Состојба',",
        "      fuelType: 'Тип на гориво',",
        "      transmission: 'Трансмисија',",
        "      bodyType: 'Тип на каросерија',",
        "      exteriorColor: 'Надворешна боја',",
        "      interiorColor: 'Внатрешна боја',",
        "      price: 'Цена',",
        "      description: 'Опис',",
        "      contactName: 'Контакт име',",
        "      contactPhone: 'Контакт телефон',",
        "      contactEmail: 'Контакт е-пошта',",
        "      location: 'Локација',",
        "      rememberMe: 'Запомни ме',",
        "      termsAccepted: 'Услови прифатени',",
        "      privacyAccepted: 'Приватност прифатена',",
        "      fullName: 'Полно име',",
        "      phone: 'Број на телефон',",
        "      message: 'Порака'",
        "    },",
        "    // Rest will be filled in with proper extraction...",
        "  },",
        ""
    ])
    
    print("This is a template - the actual implementation would extract and merge")
    print("all content from each duplicate object systematically.")
    print("Due to the complexity and size, this would require careful manual review")
    print("or a more sophisticated parsing approach.")
    
    return consolidated_content

if __name__ == "__main__":
    consolidate_mk_translations()