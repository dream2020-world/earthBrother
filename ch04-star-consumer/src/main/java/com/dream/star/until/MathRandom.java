package com.dream.star.until;

import java.util.Random;

/**
 * @Autor:dream Data:2021/3/18 15:57
 * version:1.0
 */
public class MathRandom {
    private static final Random random = new Random();
    private static final Integer END = 10;

    private static final Integer CAPTCHA_LENGTH = 6;

    public static String create() {
        Double pross = random.nextDouble() * Math.pow(END, CAPTCHA_LENGTH);
        String captcha = String.format("%06.0f", pross);
        return captcha;
    }
}
