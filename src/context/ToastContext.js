import React, { createContext, useState, useContext, useCallback, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CORES, ESPACO, RAIO, SOMBRA } from '../theme/cores';

const ehWeb = Platform.OS === 'web';
const createPortal = ehWeb ? require('react-dom').createPortal : null;

export const ToastContext = createContext(null);

const ICONES = {
  sucesso: { nome: 'checkmark-circle', cor: CORES.verde },
  erro: { nome: 'alert-circle', cor: CORES.vermelho },
  info: { nome: 'information-circle', cor: CORES.azul },
};

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const opacidade = useRef(new Animated.Value(0)).current;
  const temporizador = useRef(null);
  const insets = useSafeAreaInsets();

  const esconder = useCallback(() => {
    Animated.timing(opacidade, { toValue: 0, duration: 200, useNativeDriver: !ehWeb })
      .start(() => setToast(null));
  }, [opacidade]);

  const mostrar = useCallback((mensagem, tipo = 'sucesso') => {
    if (temporizador.current) clearTimeout(temporizador.current);
    setToast({ mensagem, tipo });
    Animated.timing(opacidade, { toValue: 1, duration: 200, useNativeDriver: !ehWeb }).start();
    temporizador.current = setTimeout(esconder, 2600);
  }, [opacidade, esconder]);

  const conf = toast ? (ICONES[toast.tipo] || ICONES.info) : null;

  let overlay = null;
  if (toast) {
    overlay = (
      <Animated.View
        style={[s.wrap, ehWeb ? s.wrapWeb : { position: 'absolute', bottom: ESPACO.xl + insets.bottom }, { opacity: opacidade, pointerEvents: 'none' }]}
      >
        <View style={s.toast}>
          <Ionicons name={conf.nome} size={20} color={conf.cor} />
          <Text style={s.txt} numberOfLines={3}>{toast.mensagem}</Text>
        </View>
      </Animated.View>
    );
    if (ehWeb && createPortal && typeof document !== 'undefined') {
      overlay = createPortal(overlay, document.body);
    }
  }

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      {overlay}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  return ctx || { mostrar: () => {} };
};

const s = StyleSheet.create({
  wrap: { left: 0, right: 0, alignItems: 'center', paddingHorizontal: ESPACO.lg, zIndex: 2147483647 },
  wrapWeb: { position: 'fixed', bottom: ESPACO.xl },
  toast: {
    flexDirection: 'row', alignItems: 'center', gap: ESPACO.sm,
    backgroundColor: CORES.texto, paddingVertical: ESPACO.md, paddingHorizontal: ESPACO.lg,
    borderRadius: RAIO.pill, maxWidth: 440, ...SOMBRA.flutuante,
  },
  txt: { color: CORES.branco, fontSize: 14, fontWeight: '600', flexShrink: 1 },
});
