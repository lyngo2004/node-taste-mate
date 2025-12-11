const { UserPreference, sequelize } = require('../models');

const submitOnboardingService = async (body) => {
    const { userId, preferences } = body;

    // Validate input
    if (!userId || !preferences) {
        return {
            EC: 1,
            EM: "Missing userId or preferences",
            DT: ""
        };
    }

    const t = await sequelize.transaction();

    try {
        // 1. Xoá tất cả preferences cũ của user
        await UserPreference.destroy({
            where: { userId },
            transaction: t
        });

        // 2. Chuẩn bị records mới
        const records = [];

        for (const attributeType in preferences) {
            const values = preferences[attributeType];

            // Nếu FE gửi mảng
            if (Array.isArray(values)) {
                values.forEach(val => {
                    records.push({
                        userId,
                        attributeType,
                        attributeValue: val
                    });
                });
            } else {
                // FE gửi string
                records.push({
                    userId,
                    attributeType,
                    attributeValue: values
                });
            }
        }

        // 3. Insert toàn bộ preferences mới
        await UserPreference.bulkCreate(records, { transaction: t });

        // Commit transaction
        await t.commit();

        return {
            EC: 0,
            EM: "Onboarding submitted successfully",
            DT: true
        };

    } catch (error) {
        await t.rollback();
        console.error("Onboarding Submit Service Error:", error);
        return {
            EC: -1,
            EM: "Server error",
            DT: null
        };
    }
};

module.exports = {
    submitOnboardingService
};
